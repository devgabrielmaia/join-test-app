import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Icon from "../../@core/components/icon";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

type Field = {
  label: string
  align?: 'left'|'right'|'center'
  name: string
}

type Props = {
  title?: string
  fields: Field[]
  data: {[key: string]: string|number}[]
  onDelete?: (target: string|number) => void
  onEdit?: (target: string|number) => void
  onCreate?: () => void
  target?: string|number
}

export function SimpleDataTable({
  title,
  fields,
  data,
  onDelete,
  onEdit,
  onCreate,
  target
}: Props) {
  return (
    <>
      {!!(title || onCreate) && (
      <Grid justifyContent="space-between" alignItems="center" container spacing={2}>
        {title && (
        <Grid item xs="auto">
          <h2>{title}</h2>
        </Grid>
        )}
        {onCreate && (
        <Grid item xs="auto">
          <Button
            variant="outlined"
            onClick={onCreate}
            startIcon={<Icon width={20} icon='gridicons:create' />}
          >
            Create
          </Button>
        </Grid>
        )}
      </Grid>
      )}
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell key={index} align={field.align || 'left'}>{field.label}</TableCell>
              ))}
              {!!(onDelete || onEdit) && (
              <TableCell align="right"></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {fields.map((field, index) => (
                  <TableCell key={index} align={field.align || 'left'}>{row[field.name]}</TableCell>
                ))}
                {!!(onDelete || onEdit) && (
                <TableCell align="right">
                  {onDelete && (
                  <IconButton onClick={() => onDelete(target ? row[target] : index)} aria-label="delete">
                    <Icon width={20} icon='ic:baseline-delete' />
                  </IconButton>
                  )}
                  {onEdit && (
                  <IconButton onClick={() => onEdit(target ? row[target] : index)} aria-label="edit">
                    <Icon width={20} icon='bxs:edit' />
                  </IconButton>
                  )}
                </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
