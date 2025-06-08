import styles from './styles.module.css'
import rareimg1 from './../../sources/images/wins/rare1.svg'
import rareimg2 from './../../sources/images/wins/rare2.svg'
import rareimg3 from './../../sources/images/wins/rare3.svg'
import rareimg4 from './../../sources/images/wins/rare4.svg'
import rareimg5 from './../../sources/images/wins/rare5.svg'
import rareimg6 from './../../sources/images/wins/rare6.svg'
import rareimg7 from './../../sources/images/wins/rare7.svg'
import { IItem, rarities } from '@/types/types'
import Image from 'next/image'


interface Props {
    item: IItem,

    width?: number
    height?: number
}

const rarityImages = {
    [rarities.white]: rareimg1,
    [rarities.wblue]: rareimg2,
    [rarities.blue]: rareimg3,
    [rarities.purple]: rareimg4,
    [rarities.pink]: rareimg5,
    [rarities.red]: rareimg6,
    [rarities.gold]: rareimg7,
};

const ItemImage: React.FC<Props> = ({ item, width=79, height=79 }) => {
    return (
        <div className={styles.image}>
            <Image quality={100} className={styles.rarity} width={width} height={height} src={rarityImages[item.rarity]} alt='rare' />
            <Image quality={100} unoptimized={true} priority={false} className={styles.item} width={width} height={height} src={item.image} alt='img' />
        </div>

    );
}
export default ItemImage;