import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import theme, { whitesmoke } from "../theme";

type FlexProps = {
  gap?: number;
};

type ColumnProps = {
  gap?: string;
  margin?: string;
  width?: string;
  padding?: string;
};

const { palette } = theme;

export const CardContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Row = styled.div<FlexProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.gap}px;
`;

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding}em;
  gap: ${(props) => props.gap}em;
`;

export const FavouriteCard = styled.div`
  display: flex;
`;

export const StyledIconButton = styled(IconButton)`
  color: ${palette.primary.main};
`;

// Navbar

export const Nav = styled(Box)`
  width: 100%;
  position: fixed;
  z-index: 1000;
  background-color: ${palette.primary.main};
`;

export const ImageLogoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  color: ${whitesmoke};
  width: 96%;
  padding:10px;
  margin: auto;
`;

// Grid
export const Grid = styled.div`
  min-height: 300px;
  display: grid;
  flex-wrap: wrap;
  gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const CardWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${whitesmoke};
  gap: 1em;
  padding: 2em;
  box-shadow: 1px 2px 3px ${theme.palette.primary.main};
`;

export const SchoolText = styled(Box)`
  display: flex;
  alignitems: "center";
  gap: 10px;
  margin-top: 1em;
`;
