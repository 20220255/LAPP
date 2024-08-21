import { Paragraph, Title, Image } from "./HomeStyles"
import LassapImage from '../asset/LasappImage169_2.png'


const Home = () => {
    return (
        <>
            <section >
                <Title>LaSapp</Title>
                <Paragraph>Your Laudromat Sales Application</Paragraph>

                <Image src={LassapImage} alt="Lasapp" />
            </section>

        </>
    )
}

export default Home
