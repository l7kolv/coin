import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { Coin, CoinWrapper, CoinsList, Container, Header, Img, Loader, Title } from '../Style';
import { fetchCoins } from '../api';
import { useQuery } from 'react-query';

interface CoinInterface {
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string

}


const Coins = () => {
    const { isLoading, data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
   
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
            <Loader>
                Loading...
            </Loader>
            ) : <CoinsList>
            {data?.slice(0,100).map(coin => <Coin key = {coin.id}>
                <Link 
                    to={`/${coin.id}`}
                    state={{ name: coin.name, rank: coin.rank }}
                >
                    <CoinWrapper>
                        <Img src = {`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} alt = "logo"/>
                        {coin.name} &rarr;
                    </CoinWrapper>
                </Link>
                
            </Coin>)}
        </CoinsList> }
            
        </Container>
    );
};

export default Coins;