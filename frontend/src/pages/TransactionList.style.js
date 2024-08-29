// import styled from 'styled-components'
import { alpha } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import styled from '@mui/material/styles/styled'
import { DataGrid, gridClasses } from '@mui/x-data-grid';

export const DataGridStyle = styled('div')`

@media screen and (max-height: 667px) {
   height: 410px
}

@media screen and (max-height: 896px) and (min-height: 883px) {
   height: 710px
}

@media screen and (max-height: 882px) and (min-height: 741px) {
   height: 620px
}

@media screen and (max-height: 740px) and (min-height: 668px) {
   height: 520px
}

@media screen and (min-height: 914px) {
   height: 720px
}

@media screen and (min-height: 932px) {
   height: 720px
}

@media screen and (min-height: 1180px) {
   height: 900px
}  
`

const ODD_OPACITY = 0.2;

export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: lightBlue[50],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));
