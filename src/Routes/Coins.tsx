import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { Coin, CoinWrapper, CoinsList, Container, Header, Img, Loader, Title } from '../Style';
import { fetchCoins } from '../api';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev)
    return (
        <Container>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>

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