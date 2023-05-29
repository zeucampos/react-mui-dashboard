import { Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Spacer } from "theme/styled";
import { decimalToReal } from "utils/index";

export default function PlanSelectionDialog(props) {
  const { onClose, open, plans, onSelect } = props;

  const handleClose = () => {
    onClose();
  };

  const handleItemClick = (item) => {
    onSelect(item.id);
  };

  const sortedList = useMemo(
    () => plans.sort((a, b) => b.priority - a.priority),
    [plans]
  );

  return (
    <Dialog fullWidth maxWidth="xl" onClose={handleClose} open={open}>
      <DialogTitle id="alert-dialog-title">
        Selecione o plano de anuncio que deseja para impulsionar a venda do seu
        CADCAM.
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {sortedList?.reverse().map((tier) => (
            <Grid item key={tier.title} md={4}>
              <Card
                sx={{
                  borderColor: (theme) =>
                    tier.title.toLowerCase() === "black"
                      ? theme.palette.primary.main
                      : theme.palette.grey[200],
                  borderWidth: 4,
                  borderStyle: "solid",
                  boxShadow: "none",
                }}
              >
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  action={
                    tier.title.toLowerCase() === "black" ? (
                      <Star color="primary" />
                    ) : null
                  }
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                />
                <Typography textAlign="center">{tier.description}</Typography>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography textAlign="center">
                      {tier.installments} {"x "}
                    </Typography>
                    <Spacer size={8} />
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {decimalToReal(tier.installment_value || 0)}
                    </Typography>
                  </Box>
                  <Typography
                    // variant="p"
                    textAlign="center"
                    fontWeight="500"
                    // color="text.primary"
                  >
                    Valor total: {decimalToReal(tier.price)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleItemClick(tier)}
                  >
                    Selecionar plano {tier.title}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
