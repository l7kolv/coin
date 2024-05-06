import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonGroup, InfoWrap } from "../Style";
import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

interface RouteState {
  state: {
    name: string;
  };
}

interface RouteParams {
  coinId?: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_a: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Coin = () => {
  const { coinId } = useParams() as RouteParams;
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const {isLoading : infoLoading, data: infoData} = useQuery<InfoData>(
    ["info", coinId], () => fetchCoinInfo(coinId!)
  );
  const {isLoading : tickersLoading, data: tickersData} = useQuery<PriceData>(
    ["tickers", coinId], () => fetchCoinTickers(coinId!),
  {
    refetchInterval : 5000
  })
    ;
 

  const loading = infoLoading || tickersLoading;

  const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
    margin: 18px 0;
  `;

  const Container = styled.div`
    padding: 0px 20px;
  `;

  const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-content: center;
  `;

  const navigate = useNavigate();


  return (
    <div>
      {!loading ?
      <Container>
        <button onClick={()=>{navigate("/")}}>뒤로가기</button>
        <Helmet>

          <title>{state?.name || "Loading"}</title>
        </Helmet>
        <Header>
          <Title>{state?.name || "Loading"} </Title>
        </Header>
        <InfoWrap>
            <div>
                <h4>Rank</h4>
                <span>{infoData?.rank}</span>
            </div>
            <div>
                <h4>SYMBOL</h4>
                <span>${infoData?.symbol}</span>
            </div>
            <div>
                <h4>Price</h4>
                <span>{tickersData?.quotes.USD.price}</span>
            </div>
        </InfoWrap>
        <p style={{marginBottom:"24px"}}>{infoData?.description}</p>
        <InfoWrap>
          <div>
              <h4>Total SUPLY</h4>
              <span>{tickersData?.total_supply}</span>
          </div>
          <div>
              <h4>MAX SUPPLY</h4>
              <span>{tickersData?.max_supply}</span>
          </div>
        </InfoWrap>
        <ButtonGroup>
         
          <Link to = "chart">
            <Button isActive = {chartMatch !== null}>Chart</Button>
          </Link>
        </ButtonGroup>
    
        <Outlet context={{coinId :coinId}}/>
       
      </Container>
      
     : "loading..."}
 
    </div>
  );
};

export default Coin;
