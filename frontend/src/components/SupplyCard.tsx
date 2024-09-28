import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormGroup, Slide, TextField, Typography } from "@mui/material"
import { SupplyType } from "../features/supplies/supplyTypes"
import { ChangeEvent, useState } from "react";
import { TiCancel } from "react-icons/ti";
import { IoMdSend } from "react-icons/io";
import { FaBoxesPacking } from "react-icons/fa6";
import { Textarea } from "./SalesAccordion.style";
import { addSupply, getAllSupplies } from "../features/supplies/supplySlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";


function SupplyCard({ supply }: { supply: SupplyType }) {

    const dispatch = useDispatch<AppDispatch>()
    
    /** Gets the latet doc record from supply item */
    const { supplyName, count, image } = supply


    const [formData, setFormData] = useState({
        supplyName,
        formCount: 0,
        formComment: '',
    })

    /** Sets the card count */
    const [countCard, setCountCard] = useState(count)

    /** Sets the form data */
    const { formCount, formComment } = formData
    
    /** Dialog */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const onSubmit = async () => {
        let supplyCountTotal = 0
        
        /** Added + to convert string to number */
        supplyCountTotal = +count + +formCount
        
        /** Sets supply count total */
        setCountCard(supplyCountTotal)

        /** Input supplies into database */
        await dispatch(addSupply({ ...supply, count: supplyCountTotal, comment: formComment, countAdded: formCount, }))
        
        /** Gets all the supplies */
        await dispatch(getAllSupplies())
        
        /** Clears the form */
        setFormData({ ...formData, formCount: 0, formComment: '' })

        /** Closes the dialog */
        handleClose()

    }



    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingBottom: '1rem' }} >
            <Card onClick={handleOpen} sx={{ maxWidth: '9rem', maxHeight: '11rem' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height='55'
                        image={require('.././asset/' + image)}
                        alt="surf fab con"
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {supplyName}
                        </Typography>
                        <hr />
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Count: {countCard}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


            <FormControl onSubmit={onSubmit} component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }}>
                    <div>
                        <Dialog
                            open={open}
                            TransitionComponent={Slide}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description" component='span' >
                                    <Box component='span'>
                                        <section className="heading">
                                            <h1>
                                                <FaBoxesPacking /> Add Supplies
                                            </h1>
                                            {/* <p>Add Supplies</p> */}
                                        </section>

                                        <section className="form">
                                            <form onSubmit={onSubmit}>
                                                <div className="form-group">
                                                    {/* <Input
                                                        type="text"
                                                        required
                                                        // className="form-control"
                                                        id="formCount"
                                                        value={formCount}
                                                        name="formCount"
                                                        onChange={onChange}
                                                        placeholder="Count"
                                                    /> */}
                                                    <Box sx={{ mb: '1rem' }}>
                                                        <TextField
                                                            type='number'
                                                            id="formCount"
                                                            label="Add to Supplies"
                                                            value={formCount}
                                                            name='formCount'
                                                            onChange={onChange}
                                                            sx={{ width: '9rem', }}
                                                        />
                                                    </Box>
                                                </div>
                                                <div className="form-group">
                                                    <Box sx={{ mb: '1rem' }}>
                                                        <Textarea
                                                            required
                                                            // className="form-control"
                                                            id="formComment"
                                                            value={formComment}
                                                            name="formComment"
                                                            onChange={onChange}
                                                            placeholder="Comment"
                                                            aria-label="minimum height"
                                                            minRows={2}
                                                        />
                                                    </Box>

                                                </div>
                                            </form>
                                        </section>
                                    </Box>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant='contained' endIcon={<TiCancel />} sx={{ width: '100%' }}>Cancel</Button>
                                <Button onClick={onSubmit} variant='contained' endIcon={<IoMdSend />} sx={{ width: '100%' }}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </FormGroup>
            </FormControl>

        </div>
    )
}

export default SupplyCard
