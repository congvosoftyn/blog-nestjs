import { Controller, Get, Post, Param, UploadedFile, Res, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MAIN_URL, PUBLIC_DIR } from 'src/configs';
import { dynamicStorage, validateFile } from 'src/shared/configs/storage.config';
import JwtAuthenticationGuard from 'src/shared/guards/jwtAuthentication.guard';

@Controller('files')
export class FilesController {

  @Post()
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: dynamicStorage('upload'),
            fileFilter: validateFile
        }),
    )
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        const thumbName = file.filename.replace('.', '_thumb.');
        return {
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            originalname: file.originalname,
            url: `${MAIN_URL}/files/${file.filename}`,
        };
    }

    @Get(':image')
    viewImage(@Param('image') image: string, @Res() res: Response) {
        return res.sendFile(image, { root: `${PUBLIC_DIR}/upload` });
    }

 
}
