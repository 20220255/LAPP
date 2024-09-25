import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { SupplyType } from "../features/supplies/supplyTypes"


function SupplyCard({ supply }: { supply: SupplyType }) {

    /** Gets the latet doc record from supply item */
    const { supplyName, count, image } = supply

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingBottom: '1rem' }} >
            <Card sx={{ maxWidth: '9rem', maxHeight: '11rem' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height='55' 
                        image={require('.././asset/' + image )}
                        alt="surf fab con"
                        sx={{ objectFit: 'contain'}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {supplyName}
                        </Typography>
                        <hr />
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Count: {count}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}

export default SupplyCard
