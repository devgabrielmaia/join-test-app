import {useEffect, useState} from "react";
import {SimpleDataTable} from "../../layouts/components/SimpleDataTable";
import {ProductDataCreation, ProductEditModal} from "../../layouts/components/modal/ProductEditModal";
import {useApiService} from "../../hooks/useApiService";
import {ServiceMethodsType} from "../../context/ServiceApiContext";
import {ProductData} from "../../services/types/product-data.type";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import {CategoryDataCreation, CategoryEditModal} from "../../layouts/components/modal/CategoryEditModal";

export default function Products() {
  const [openModalEditing, setOpenModalEditing] = useState<boolean>(false);
  const [openModalCreation, setOpenModalCreation] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const [productToEdit, setProductToEdit] = useState<ProductData | null>(null);

  const service: ServiceMethodsType = useApiService();
  const router = useRouter();

  const handleClickOpenModalEditing = (id: number | null = null) => {
    setOpenModalEditing(true);
    if (!id) {
      console.log('Create new product')
      setProductToEdit(null);
      setProductToDelete(null)
      return;
    }
    const productToEdit = products.find(product => product.id === id);
    if (!productToEdit) return;
    setProductToEdit(productToEdit);
  };

  const handleClickOpenModalCreation = (id: number | null = null) => {
    setOpenModalCreation(true);
  };

  const handleClickCloseModalEditing = () => {
    setOpenModalEditing(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!productToDelete) return;
    setProducts(products.filter(product => product.id !== productToDelete.id));
    handleCloseDeleteDialog();
    await service.deleteProduct(productToDelete.id);
  }

  const handleClickCloseModalCreation = () => {
    setOpenModalCreation(false);
  }

  const handleConfirmCreate = async (data: CategoryDataCreation) => {
    await handleConfirmCreateOrUpdate(data);
    handleClickCloseModalCreation();
  }

  const handleConfirmUpdate = async (data: CategoryDataCreation) => {
    await handleConfirmCreateOrUpdate(data);
    handleClickCloseModalEditing();
  }

  const handleCloseDeleteDialog = () => {
    setProductToEdit(null);
    setProductToDelete(null)
    setOpenDeleteDialog(false);
  }

  const handleConfirmCreateOrUpdate = async (data: CategoryDataCreation) => {
    data.id
      ? await service.updateCategory(data)
      : await service.createCategory(data);
    await fetchCategories();
    handleClickCloseModalEditing();
  }

  const fetchCategories = async () => {
    const response = await service.fetchCategories();
    if (!response) return console.log('Error');
    setProducts(response as ProductData[]);
  }

  useEffect(() => {
    fetchCategories();
    if (router.query.create) {
      handleClickOpenModalCreation();
    }
  }, []);

  useEffect(() => {
    if (router.query.create) {
      handleClickOpenModalCreation();
    }
  }, [router.query.create]);

  return (
    <>
      <SimpleDataTable
        title={'Categories'}
        onCreate={handleClickOpenModalCreation}
        onEdit={(target: string|number) => handleClickOpenModalEditing(Number(target))}
        //onDelete={(target: string|number) => handleDelete(Number(target))}
        target={'id'}
        fields={[
          { name: 'id', label: 'Id', align: 'left' },
          { name: 'name', label: 'Category Name', align: 'left' },
        ]}
        data={products}
      />
      <CategoryEditModal
        isOpen={openModalEditing}
        onClose={handleClickCloseModalEditing}
        onConfirm={handleConfirmUpdate}
        data={productToEdit}
      />

      <CategoryEditModal
        isOpen={openModalCreation}
        onClose={handleClickCloseModalCreation}
        onConfirm={handleConfirmCreate}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${productToDelete?.name} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
