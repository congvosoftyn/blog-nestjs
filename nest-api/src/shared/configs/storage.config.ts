import { BadRequestException } from '@nestjs/common';
import { diskStorage } from "multer";
import { extname } from "path";
import { ALLOW_AVATAR_FILE, PUBLIC_DIR, VALIDATE_FILE_VIDEO } from 'src/configs';

export const validateFile = (req, file, cb) => {
    if (ALLOW_AVATAR_FILE.includes(file.mimetype)) {
        cb(null, true);
    } else if (VALIDATE_FILE_VIDEO.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new BadRequestException('Only image(.png, .jpg and .jpeg) or video(webm or mp4) format allowed!'))
    }
};

export const dynamicStorage = (destination: string) => {
    return diskStorage({
        destination: `./${PUBLIC_DIR}/${destination}`,
        filename: (req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
        },
    })
}