import { useTheme } from "@emotion/react";

function MenuBurger() {
  const theme = useTheme();

  return (
    <div className="flex items-evenly">
      <div
        className="flex rounded-xl justify-center"
        style={{
          backgroundColor: theme.palette.secondary.main,
          height: "48px",
          width: "48px",
        }}
      >
        <svg
          className=" m-auto"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
            fill={theme.palette.primary.main}
          />
        </svg>
      </div>
    </div>
  );
}

export default MenuBurger;
