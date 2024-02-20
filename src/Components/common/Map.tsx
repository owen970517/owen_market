import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { regionActions } from '../../store/regionSlice';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const dispatch = useDispatch();
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  
  useEffect(() => {
    const loadMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker());
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(script);
      script.onload = loadMap;
    } else {
      loadMap();
    }
  }, []);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const getNearbyDongs = (latitude: number, longitude: number) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 1km 반경 내의 임의의 위치를 생성합니다.
    const locations = [];
    const lat_diff = 0.009;  // 위도 1km
    const lng_diff = 0.009 * Math.cos(latitude * Math.PI / 180);  // 경도 1km

    for (let i = -lat_diff; i <= lat_diff; i += lat_diff/2) {
        for (let j = -lng_diff; j <= lng_diff; j += lng_diff/2) {
            locations.push({ lat: latitude + i, lng: longitude + j });
        }
    }

    locations.forEach(location => {
        geocoder.coord2RegionCode(location.lng, location.lat, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const dong = result.find((item: any) => item.region_type === 'H');
                if (dong) {
                  console.log(dong); // '동' 이름 출력
                }
            } else {
                console.error('주소 검색 실패:', status);
            }
        });
    });
};

  const getPosSuccess = (pos: GeolocationPosition) => {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );
    getNearbyDongs(pos.coords.latitude,pos.coords.longitude)
    map.panTo(currentPos);
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
    getReverseGeocoding(pos.coords.latitude, pos.coords.longitude)
  };

  const getReverseGeocoding = (latitude:number, longitude:number) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(longitude, latitude, (result:any, status:any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result)
        const address = `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`
        dispatch(regionActions.setCurrentPos(address))
      } else {
        console.error('주소 검색 실패:', status);
      }
    });
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div onClick={getCurrentPosBtn}>내 위치</div>
    </div>
  );
};

export default Map;
