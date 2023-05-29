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
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Title from "components/Title";
import BrandService from "services/brand";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { Edit, Trash } from "react-feather";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

export default function BrandsList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await BrandService.index(page);

    setList(res);
  };

  const sendDelete = async (id) => {
    const res = await BrandService.destroy(id);

    if (res) {
      toast("Deletado com sucesso!");
      await fetchData();
    }
  };

  const handlePageChange = (pageNumber) => fetchData(page);

  useEffect(() => {
    // if (!list.data)
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
      <Title>Marcas</Title>

      <Button
        type="submit"
        endIcon={<Add />}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/auth/brands/create")}
      >
        Cadastrar nova marca
      </Button>
      {list.data?.length === 0 ? (
        <center>
          <Title>Oops... ainda não há nada aqui.</Title>
        </center>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Marca</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.data &&
                list.data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="Editar"
                        onClick={() =>
                          navigate("/auth/brands/edit", {
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
                        aria-label="Deletar"
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

      {list.meta && (
        <Pagination
          page={page}
          lastPage={list.meta.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
