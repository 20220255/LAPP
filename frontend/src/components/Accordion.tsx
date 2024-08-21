import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
// import {ExpandMoreIcon} from '@mui/icons-material';
import { MdExpandMore } from "react-icons/md";
import { TypographyStyled } from './Accordion.style';
import { Box, FormControl, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from '@mui/material';
import products from '../data/prodcut.json'


type ProductType = {
    id: number;
    name: string;
    price: number;
}

function filterItems(arr: ProductType[], query: string): ProductType[] {
    return arr.filter((el) => el.name.includes(query));
}


export type SalesTransType = {
    firstName: string,
    lastName?: string,
    w1: boolean;
    w2: boolean;
    w3: boolean;
    w4: boolean;
    w5: boolean;
    d1: boolean;
    d2: boolean;
    d3: boolean;
    d4: boolean;
    d5: boolean;
    detergent?: {
        name: string ;
        count: number ;
    };
    fabCon?: {
        name: string ;
        count: number ;
    }
    extraDry?: number ;
    folds?: number ;
    spinDry?: number;
}


export default function ControlledAccordions() {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const [formData, setFormData] = React.useState<SalesTransType>({
        firstName: '',
        lastName: '',
        w1: false,
        w2: false,
        w3: false,
        w4: false,
        w5: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        detergent: {
            name: '',
            count: 0,
        },
        fabCon: {
            name: "",
            count: 0,
        },
        extraDry: 0,
        folds: 0,
        spinDry: 0
    })

    const { firstName, lastName, w1, w2, w3, w4, w5, d1, d2, d3, d4, d5, extraDry, folds, spinDry } = formData

    const [chkExtraDry, setChkExtraDry] = React.useState(false)
    const [chkFolds, setChkFolds] = React.useState(false)
    const [chkSpinDry, setChkSpinDry] = React.useState(false)

    const [detergentProducts, setDetergentProducts] = React.useState<ProductType[]>(products)
    const [fabconProducts, setFabconProducts] = React.useState<ProductType[]>(products)

    React.useEffect(() => {
        const detergentProducts = filterItems(products, "Detergent")
        console.log(detergentProducts)
        setDetergentProducts(detergentProducts)
        const fabConProducts = filterItems(products, "Fabcon")
        console.log(fabConProducts)
        setFabconProducts(fabConProducts)
    }, [])



    // Accordion
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // Form    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, checked, value } = e.target

        setFormData((prevState) => {
            return { ...prevState, [name]: type === 'checkbox' ? checked : value }
        })
    }

    const onChangeExtraDry = () => {
        setChkExtraDry((extraDry) => !extraDry)
    }

    const onChangeFolds = () => {
        setChkFolds((folds) => !folds)
    }

    const onChangeSpinDry = () => {
        setChkSpinDry((spinDry) => !spinDry)
    }



    return (
        <div >

            <FormControl component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }} >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <TypographyStyled >
                                Customer
                            </TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box paddingBlock={0.75} >
                                    <TextField
                                        required
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        name='firstName'
                                        placeholder='Enter first name'
                                        onChange={onChange}
                                        sx={{ width: '280px' }}
                                    />
                                </Box>
                                <Box paddingBlock={0.75}>
                                    <TextField
                                        sx={{ width: '280px' }}
                                        id="lastName"
                                        label="Last Name"
                                        value={lastName}
                                        name='lastName'
                                        placeholder='Enter last name'
                                        onChange={onChange}
                                    />
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <TypographyStyled>Washers</TypographyStyled>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {/* You are currently not an owner */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display='block'>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w1} onChange={onChange} name="w1" />
                                        }
                                        label="W1"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w2} onChange={onChange} name="w2" />
                                        }
                                        label="W2"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w3} onChange={onChange} name="w3" />
                                        }
                                        label="W3"

                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w4} onChange={onChange} name="w4" />
                                        }
                                        label="W4"
                                    />
                                </div>

                                <FormControlLabel
                                    control={
                                        <Switch checked={w5} onChange={onChange} name="w5" />
                                    }
                                    label="W5"
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            
                        >
                            <TypographyStyled >
                                Dryers
                            </TypographyStyled>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {/* Filtering has been entirely disabled for whole web server */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display='block'>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d1} onChange={onChange} name="d1" />
                                        }
                                        label="D1"

                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d2} onChange={onChange} name="d2" />
                                        }
                                        label="D2"
                                        
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d3} onChange={onChange} name="d3" />
                                        }
                                        label="D3"
                                        
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d4} onChange={onChange} name="d4" />
                                        }
                                        label="D4"
                                        
                                    />
                                </div>

                                <FormControlLabel

                                    control={
                                        <Switch checked={d5} onChange={onChange} name="d5"  />
                                    }
                                    label="D5"
                                    
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <TypographyStyled>Detergent & Fab Con</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    id="detergent"
                                    select
                                    label="Detergent"
                                    defaultValue=""
                                    helperText="Please select your detergent"
                                >
                                    {detergentProducts.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}: <span>&#8369;</span>{product.price}.00
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>

                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    id="fabcon"
                                    select
                                    label="Fab Con"
                                    defaultValue=""
                                    helperText="Please select your fab con"
                                >
                                    {fabconProducts.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}: <span>&#8369;</span>{product.price}.00
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>

                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <TypographyStyled>Additional Services</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <FormControlLabel

                                    control={
                                        <Switch checked={chkExtraDry} onChange={onChangeExtraDry} name="chkExtraDry" />
                                    }
                                    label="Extra Dry"
                                    sx={{ paddingRight: '0.5rem' }}
                                />
                                <TextField
                                    type='number'
                                    id="extraDry"
                                    label="Extra Dry Count"
                                    value={extraDry}
                                    name='extraDry'
                                    onChange={onChange}
                                    disabled={chkExtraDry ? false : true}
                                    sx={{ width: '12rem', }}

                                />
                            </Box>
                            <Box sx={{ mb: '1rem' }}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={chkFolds} onChange={onChangeFolds} name="chkFolds" />
                                    }
                                    label="With Folds"
                                    
                                />
                                <TextField
                                    type='number'
                                    id="withFolds"
                                    label="Folds Count"
                                    value={folds}
                                    name='folds'
                                    onChange={onChange}
                                    disabled={chkFolds ? false : true}
                                    sx={{ width: '12rem' }}
                                />
                            </Box>

                            <Box>
                                <FormControlLabel
                                    control={
                                        <Switch checked={chkSpinDry} onChange={onChangeSpinDry} name="chkFolds" />
                                    }
                                    label="Spin Dry"
                                    
                                    sx={{ pr: '0.8rem' }}
                                />
                                <TextField
                                    type='number'
                                    id="spinDry"
                                    label="Spin Dry Count"
                                    value={spinDry}
                                    name='spinDry'
                                    onChange={onChange}
                                    disabled={chkSpinDry ? false : true}
                                    sx={{ width: '12rem' }}
                                />
                            </Box>

                        </AccordionDetails>
                    </Accordion>

                </FormGroup>
            </FormControl>

        </div>
    );
}
