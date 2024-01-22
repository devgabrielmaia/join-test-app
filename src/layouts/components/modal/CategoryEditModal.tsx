import {Dialog, DialogActions, DialogContent, DialogTitle, Select, SelectChangeEvent} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useApiService} from "../../../hooks/useApiService";
import {CategoryData} from "../../../services/types/category-data.type";

export type CategoryDataCreation = {
  name: string,
  id: number | null
}

type Error = {
  categoryName: boolean
}

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: (data: CategoryDataCreation) => void,
  data?: CategoryDataCreation | null
}

export function CategoryEditModal({isOpen, onClose, onConfirm, data}: Props) {
  const [categoryName, setCategoryName] = useState(data?.name || '');
  const [error, setError] = useState<Error>({} as Error);

  const service = useApiService();

  const handleChangeCategoryName = (value: string) => {
    setError({...error, categoryName: false})
    setCategoryName(value);
  }
  const handleConfirm = () => {
    if (categoryName === '') {
      setError({...error, categoryName: true});
      return;
    }
    onConfirm({
      name: categoryName,
      id: data?.id || null
    })
  }

  useEffect(() => {
    setCategoryName(data?.name || '');
  }, []);

  useEffect(() => {
    setCategoryName(data?.name || '');
  }, [data]);

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Create new Category"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="categoryName"
              name="categoryName"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              error={error.categoryName}
              helperText="Category name is required."
              value={categoryName}
              onChange={(event) => handleChangeCategoryName(event.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          {!!data ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
