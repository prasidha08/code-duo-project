import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Typography } from "@mui/material";
import { Div } from "../styles/styledComponent/styled";

export const TYPE = {
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER: "INTERNAL_SERVER",
} as const;

type ErrorBoundaryProps = {
  fallback?: string;
  type: "NOT_FOUND" | "INTERNAL_SERVER";
};

export default function ErrorBoundary({ fallback, type }: ErrorBoundaryProps) {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Div>
      <Typography variant="h1">
        {fallback ?? "Something went wrong!"}
      </Typography>

      {type !== TYPE.NOT_FOUND && (
        <Button
          variant="outlined"
          endIcon={<RefreshIcon />}
          onClick={reloadPage}
        >
          ReFresh page
        </Button>
      )}
    </Div>
  );
}
