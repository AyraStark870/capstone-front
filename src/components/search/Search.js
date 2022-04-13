import React, { useContext, useEffect, useState } from "react";
import { UIContext } from "../../context/UIContext";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
  const { filterProductByName } = useContext(UIContext);
  const handleChange = ({ target }) => {
    filterProductByName(target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: 400,
        marginTop: "2px",
      }}
    >
      <InputBase
        onChange={handleChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search product by name"
      />
      <Divider
        sx={{ height: 28, m: 0.5, color: "#fff" }}
        orientation="vertical"
      />
      <IconButton
        color="primary"
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

// export const Search = () => {
//   const { filterProductByName } = useContext(UIContext);
//   const handleChange = ({ target }) => {
//     filterProductByName(target.value);
//   };

//   return (
//     <div>
//       {" "}
//       <List>
//         <ListItem>
//           <TextField
//             variant="outlined"
//             label="search product..."
//             // value={formValue}
//             inputProps={{ type: "text" }}
//             onChange={handleChange}
//           ></TextField>
//         </ListItem>
//       </List>
//     </div>
//   );
// };
