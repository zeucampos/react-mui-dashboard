import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAds } from "providers/AdProvider";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AdService from "services/ad";
import { useEffect, useState } from "react";
import { Check, Edit, Trash } from "react-feather";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { FlexColumn, FlexRow, Spacer } from "theme/styled";
import PaymentService from "services/payment";
import { decimalToReal } from "utils/index";
import Formatter from "utils/formatter";

export const EquipamentStatusName = {
  pending: "Pagamento pendente",
  approved: "Pagamento aprovado",
  started: "Ativo",
  rejected: "Pagamento rejeitado",
  sell: "Vendido",
  expired: "Expirado",
};

export default function AdList() {
  const { list, setList, setCurrent } = useAds();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [activeTotal, setActiveTotal] = useState(0);
  const [form, setForm] = useState({
    year: "",
    month: "",
    day: "",
  });

  const fetchData = async (page = 1) => {
    const res = await AdService.index(page);
    setList(res);
  };

  const sendDelete = async (id) => {
    const res = await AdService.destroy(id);

    if (res) {
      toast.success("Deletado com sucesso!");
      await fetchData();
    }
  };

  const getReport = async (id) => {
    const res = await PaymentService.report(form);

    if (res) {
      setTotal(res.total);
    }
  };

  const changeForm = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = (id) => {
    confirmAlert({
      title: "Atenção!",
      message: "Confirma a aprovação deste anuncio?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            await AdService.update({ id, status: "started" });
            fetchData();
            toast.success("Aprovado com sucesso!");
          },
        },
        {
          label: "Não",
          onClick: () => null,
        },
      ],
    });
  };
  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Atenção!",
      message: "Tem certeza de que deseja deletar este item?",
      buttons: [
        {
          label: "Sim",
          onClick: () => sendDelete(id),
        },
        {
          label: "Não",
          onClick: () => null,
        },
      ],
    });
  };

  const yearOptions = () => {
    const startYear = 2023;
    let options = [];
    for (let year = startYear; year <= startYear + 10; year++) {
      options.push(
        <MenuItem value={year.toString()} key={`month-${year}`}>
          {year.toString()}
        </MenuItem>
      );
    }

    return options;
  };

  const dayOptions = () => {
    let options = [];
    for (let day = 1; day <= 31; day++) {
      options.push(
        <MenuItem value={day.toString()} key={`day-${day}`}>
          {day.toString()}
        </MenuItem>
      );
    }

    return options;
  };

  const monthOptions = () => {
    const months = [
      { id: "", nome: "Todods os meses" },
      { id: 1, nome: "Janeiro" },
      { id: 2, nome: "Fevereiro" },
      { id: 3, nome: "Março" },
      { id: 4, nome: "Abril" },
      { id: 5, nome: "Maio" },
      { id: 6, nome: "Junho" },
      { id: 7, nome: "Julho" },
      { id: 8, nome: "Agosto" },
      { id: 9, nome: "Setembro" },
      { id: 10, nome: "Outubro" },
      { id: 11, nome: "Novembro" },
      { id: 12, nome: "Dezembro" },
    ];

    return months.map((month) => (
      <MenuItem value={month.id.toString()} key={month.nome}>
        {month.nome}
      </MenuItem>
    ));
  };

  return (
    <>
      <Card>
        <CardContent>
          <FlexRow alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Anuncios ativos
            </Typography>
            <Spacer size={8} />
            <Chip label={activeTotal} color="primary" />
          </FlexRow>
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardHeader
          title="Relatório financeiro"
          titleTypographyProps={{
            fontWeight: "bold",
          }}
          // subheader={tier.description}
          // titleTypographyProps={{ align: "center" }}
          // action={tier.title === "BLACK" ? <Star /> : null}
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <label htmlFor="year">Ano</label>
              <Select
                fullWidth
                id="year"
                value={form.year}
                label="year_id"
                onChange={(e) => changeForm("year", e.target.value)}
              >
                <MenuItem value={""} key={`month-initial`}>
                  Todo o período
                </MenuItem>
                {yearOptions()}
              </Select>
            </Grid>
            <Grid item md={4}>
              <label htmlFor="month">Mês</label>
              <Select
                fullWidth
                id="month"
                value={form.month}
                label="month_id"
                onChange={(e) => changeForm("month", e.target.value)}
              >
                {monthOptions()}
              </Select>
            </Grid>
            <Grid item md={4}>
              <label htmlFor="day">Dia</label>
              <Select
                fullWidth
                id="day"
                value={form.day}
                label="day_id"
                onChange={(e) => changeForm("day", e.target.value)}
              >
                <MenuItem value={""} key={`day-initial`}>
                  Todo o período
                </MenuItem>
                {dayOptions()}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={getReport}
          >
            Aplicar filtro
          </Button>
          <Spacer />
          <Card
            sx={{
              background: (theme) => theme.palette.grey[200],
              boxShadow: "none",
            }}
          >
            <CardContent>
              <FlexColumn alignItems="center">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {decimalToReal(total || 0)}
                </Typography>
              </FlexColumn>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Spacer size={24} />
      <Typography fontWeight="bold" variant="h5">
        Todos os anúncios
      </Typography>
      <Button
        type="submit"
        endIcon={<AddAPhoto />}
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => navigate("/auth/ads/create")}
      >
        Cadastrar anúncio
      </Button>
      {list?.length === 0 ? (
        <center>
          <Typography>Oops... ainda não há nada aqui.</Typography>
        </center>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Capa</TableCell>
                <TableCell align="left">Título</TableCell>
                <TableCell align="right">Tipo equipamento</TableCell>
                <TableCell align="right">Data de venc.</TableCell>
                <TableCell align="right">Valor do anuncio</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length >= 1 &&
                list?.map((row) => (
                  <TableRow
                    key={`${row.thumbnail_url}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${row.thumbnail_url}`}
                        alt=""
                        width="80px"
                      />
                    </TableCell>

                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      {row.end_date && (
                        <Button color="error">
                          {Formatter.ptDate.format(row.end_date || "")}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {decimalToReal(row.plan_price)}
                    </TableCell>
                    <TableCell align="right">
                      {decimalToReal(row.price)}
                    </TableCell>
                    <TableCell align="right">
                      {row.status === "pending" ? (
                        <Button
                          color="error"
                          onClick={() => {
                            setCurrent(row);
                            navigate(`/auth/ads/checkout/${row.id}`);
                          }}
                        >
                          Realizar pagamento
                        </Button>
                      ) : (
                        EquipamentStatusName[row.status]
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.status === "approved" || row.status === "pending" ? (
                        <Tooltip title="Aprovar anuncio">
                          <IconButton
                            color="primary"
                            aria-label="Aprovar anuncio"
                            onClick={() => handleApprove(row.id)}
                          >
                            <Check />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Editar">
                        <IconButton
                          color="info"
                          aria-label="Editar"
                          onClick={() =>
                            navigate("/auth/ads/edit", {
                              state: {
                                row,
                              },
                            })
                          }
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="Deletar"
                        >
                          <Trash />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* {list.meta && (
        <Pagination
          page={page}
          lastPage={list.meta.last_page}
          onPageChange={handlePageChange}
        />
      )} */}
    </>
  );
}
