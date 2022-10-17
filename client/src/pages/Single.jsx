import React from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link } from "react-router-dom";
import { Menu } from "../components/Menu";

export function Single() {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="single"
        />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="single"
          />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          {/* info */}
          <div className="edit">
            <Link to={`/write?edit=2 `}>
              <img src={Edit} alt="edit" />
            </Link>
            <img src={Delete} alt="delete" />
          </div>
          {/* edit */}
        </div>
        {/* user */}
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus
          excepturi aliquid nihil cumque ipsam facere aperiam at!
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus
          excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem
          ratione sit debitis deserunt repellendus numquam ab vel perspiciatis
          corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
          possimus excepturi aliquid nihil cumque ipsam facere aperiam at!
          Eadolorem ratione sit debitis deserunt repellendus numquam ab vel
          perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam
          facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus
          numquam ab vel perspiciatis corporis!Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. A possimus excepturi aliquid nihil
          cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis
          deserunt repellendus numquam ab vel perspiciatis corporis!Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. A possimus excepturi
          aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit
          debitis deserunt repellendus numquam ab vel perspiciatis
          corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
          possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea
          dolorem ratione sit debitis deserunt repellendus numquam ab vel
          perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam
          facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus
          numquam ab vel perspiciatis corporis!Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. A possimus excepturi aliquid nihil
          cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis
          deserunt repellendus numquam ab vel perspiciatis corporis!Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. A possimus excepturi
          aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit
          debitis deserunt repellendus numquam ab vel perspiciatis
          corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
          possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea
          dolorem ratione sit debitis deserunt repellendus numquam ab vel
          perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
      </div>

      {/* <div className="menu">menu</div> */}
      <Menu />
    </div>
  );
}
