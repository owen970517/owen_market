import React,{useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { db } from '../../firebase'
import { IData } from '../../type/ItemProps';

const SaleProducts = ({userNickName}:any) => {
    const [saleData , setSaleData] = useState<IData[]>([]);
    useEffect(() => {
        db.collection('Product').where('상태' , '==' , '판매중').where('올린사람' ,'==' , userNickName).get().then((result) => {
            const saling = result.docs.map((doc) =>({
                id : doc.id,
                ...doc.data()
            }))
            setSaleData(saling);  
        })
    },[userNickName])
  return (
    <Grid>
        {saleData.map((p) =>  {
        return (
            <div key={p.id}>
            <img src={p.이미지 ? p.이미지 : 'https://via.placeholder.com/350'} alt='img' width ='200px' height='200px'/>
            <div>
                <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
                <h3>{p.날짜}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
            </div>
            </div>
            )
        })}
    </Grid> 
  )
}
const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 10px;
    place-items: center;
`;

export default SaleProducts