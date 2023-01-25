import React from 'react'
import styled from 'styled-components'

const SkeletonUI = () => {
  return (
    <SkeletonBox>
        <SkeletonImg/>
        <div>
            <SkeletonProductName/>
            <SkeletonDate/>
            <SkeletonRegion/>
            <SkeletonPrice/>
        </div>
    </SkeletonBox>
  )
}

const SkeletonBox = styled.div`
    display : flex;
    flex-direction: column;
`
const SkeletonImg = styled.img`
    width : 300px;
    height : 300px;
    background: #f2f2f2;
`
const SkeletonProductName = styled.p`
    width: 60%;
    height: 24px;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
`
const SkeletonDate = styled.p`
    width: 70%;
    height: 24px;
    background: #f2f2f2;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
`
const SkeletonPrice = styled.p`
    width: 70%;
    height: 24px;
    background: #f2f2f2;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
`
const SkeletonRegion = styled.p`
    width: 50%;
    height: 24px;
    background: #f2f2f2;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
`


export default SkeletonUI