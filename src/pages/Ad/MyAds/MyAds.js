import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAds } from "providers/AdProvider";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Title from "components/Title";
import AdService from "services/ad";
import { useEffect, useState } from "react";
import { Edit, Trash } from "react-feather";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import { decimalToReal } from "utils/index";

export const EquipamentStatusName = {
  pending: "Pagamento pendente",
  approved: "Ativo",
  rejected: "Pagamento rejeitado",
  sell: "Vendido",
  expired: "Expirado"
};

export default function MyAds() {
  const { list, setList, setCurrent } = useAds();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await AdService.index(page);
    setList(res);
  };

  const sendDelete = async (id) => {
    const res = await AdService.destroy(id);

    if (res) {
      toast("Deletado com sucesso!");
      await fetchData();
    }
  };

  const handlePageChange = (pageNumber) => fetchData(page);

  useEffect(() => {
    // if (!list)
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Atenção!",
      message: "Tem certeza de que deseja deletar este item?",
      buttons: [
        {
          label: "Sim",
          onClick: () => sendDelete(id)
        },
        {
          label: "Não",
          onClick: () => null
        }
      ]
    });
  };

  return (
    <>
      <Title>Meus anúncios</Title>

      <Button
        type="submit"
        endIcon={<AddAPhoto />}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/auth/ads/create")}
      >
        Cadastrar anúncio
      </Button>
      {list?.length === 0 ? (
        <center>
          <Title>Oops... ainda não há nada aqui.</Title>
        </center>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell align="left">Capa</TableCell>
                <TableCell align="left">Título</TableCell>
                <TableCell align="right">Tipo equipamento</TableCell>
                <TableCell align="right">Nº de série</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="left">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${row.thumbnail_url}`}
                        alt=""
                        width="80px"
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.serie_number}</TableCell>
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
                      <IconButton
                        aria-label="Example"
                        onClick={() =>
                          navigate("/auth/ads/edit", {
                            state: {
                              row
                            }
                          })
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(row.id)}
                        aria-label="Example"
                      >
                        <Trash />
                      </IconButton>
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
