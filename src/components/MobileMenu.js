import React, { useEffect, useRef, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { AuthContext } from "../context/authContext";
import { useThemeContext } from "../context/themeContext";

function MobileMenu() {
  const theme = useTheme();
  const { setTheme } = useThemeContext();
  const { logout } = useContext(AuthContext);
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const StyledDropdownItem = styled.a`
    border-color: ${primaryColor};
    background-color: ${secondaryColor};
    cursor: pointer;
    &:hover {
      color: ${secondaryColor};
      font-weight: bolder;
      background-color: ${primaryColor};
      fill: ${secondaryColor};
    }
  `;

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const mainMenuRef = useRef(null);
  const settingsMenuRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.children.offsetHeight);
  }, []);

  function handleThemeChange(themeName) {
    setTheme(themeName);
  }

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  const ForwardedCSSTransition = React.forwardRef((props, ref) => (
    <CSSTransition {...props} nodeRef={ref} />
  ));

  function DropdownItem(props) {
    const { onClick } = props;

    const handleClick = () => {
      if (props.goToMenu) {
        setActiveMenu(props.goToMenu);
      }
      if (props.themeName) {
        handleThemeChange(props.themeName);
      }
      if (onClick) {
        onClick();
      }
    };
    return (
      <StyledDropdownItem
        href={props.href}
        className="menu-item"
        onClick={handleClick}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        {props.rightIcon && (
          <span className="icon-right">{props.rightIcon}</span>
        )}
      </StyledDropdownItem>
    );
  }

  return (
    <div
      className="dropdown shadow-xl"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <ForwardedCSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        ref={mainMenuRef}
      >
        <div className="menu">
          <DropdownItem href="/">Home</DropdownItem>
          <DropdownItem href="/Cart">Cart</DropdownItem>
          <DropdownItem href="/rewards">Rewards</DropdownItem>
          <DropdownItem rightIcon={<ArrowForwardIcon />} goToMenu="theme">
            Theme
          </DropdownItem>
          <DropdownItem onClick={logout} rightIcon={<LogoutIcon />}>
            Logout
          </DropdownItem>
        </div>
      </ForwardedCSSTransition>

      <ForwardedCSSTransition
        in={activeMenu === "theme"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        ref={settingsMenuRef}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<ArrowBackIcon />}
            goToMenu="main"
          ></DropdownItem>

          <DropdownItem
            themeName="default"
            leftIcon={<Brightness4Icon className=" rotate-180" />}
          >
            Default Theme
          </DropdownItem>

          <DropdownItem themeName="dark" leftIcon={<DarkModeIcon />}>
            Dark Theme
          </DropdownItem>
        </div>
      </ForwardedCSSTransition>
    </div>
  );
}

export default MobileMenu;
