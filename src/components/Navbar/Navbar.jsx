import React from "react";
import navbarStyles from "./Navbar.module.css";
import dog from "../../images/dog.png";
function Navbar() {
  return (
    <div className={navbarStyles.Navbar}>
      <h3>Dog Breeds</h3>
      <img src={dog} alt="Dog-image" className={navbarStyles.Icon} />
      <h4>Woof!</h4>
    </div>
  );
}

export default Navbar;
