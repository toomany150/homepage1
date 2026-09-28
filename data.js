/**
 * 참좋은부동산 (부산광역시 사상구) - 웹사이트 통합 데이터
 * 아파트, 주택, 상가·사무실, 공장, 토지, 네이버 블로그, 뉴스, 후기, 상담
 */

const REAL_ESTATE_DATA = {
  // 1. 매물 데이터
  properties: [
    {
      id: "APT-01",
      category: "apartment",
      categoryName: "아파트",
      title: "괘법 한신2차 104동 로얄층 올수리 남향",
      district: "괘법동",
      location: "부산 사상구 괘법동 520",
      dealType: "매매",
      price: "3억 8,500만원",
      priceValue: 38500,
      area: "109㎡ (공급 33평 / 전용 84㎡)",
      floor: "15층 / 23층",
      rooms: "방 3개 · 욕실 2개",
      maintenanceFee: "약 16만원",
      direction: "남향 (거실 기준)",
      moveInDate: "즉시입주 협의가능",
      builtYear: "2004년 (내부 올리모델링 2024년 완료)",
      parking: "세대당 1.2대 (지하주차장 엘리베이터 연결)",
      image: "images/apt_interior.jpg",
      tags: ["#사상역역세권", "#초품아", "#올리모델링", "#낙동강조망"],
      isFeatured: true,
      rating: "4.95",
      reviewCount: 18,
      description: "사상역(2호선·경전철·경부선) 도보 7분 거리의 특급 매물입니다. 거실 및 작은방 확장형으로 개방감이 탁월하며, 2024년 최고급 한샘 키친 및 시스템에어컨 4대 설치 완료되어 손댈 곳 없이 입주 가능합니다. 사상초등학교 및 괘법공원 인접으로 자녀 양육과 힐링에 최적입니다.",
      amenities: [
        { icon: "shield", label: "24시간 경비 및 CCTV 완비" },
        { icon: "car", label: "지하 주차장 엘리베이터 직결" },
        { icon: "sun", label: "하루종일 밝은 정남향 채광" },
        { icon: "wind", label: "전실 시스템 에어컨 4대 설치" },
        { icon: "maximize", label: "발코니 확장 및 단열 시공 완료" },
        { icon: "coffee", label: "단지 앞 대형마트 및 삼락생태공원 산책로" }
      ],
      agentNotes: "시세 대비 2,000만원 가량 저렴한 급매물로, 실거주 및 전세 갭투자(전세 시세 약 2억 7천만원) 모두 적극 추천합니다."
    },
    {
      id: "APT-02",
      category: "apartment",
      categoryName: "아파트",
      title: "엄궁 롯데캐슬 리버 112동 파노라마 강변뷰",
      district: "엄궁동",
      location: "부산 사상구 엄궁동 680",
      dealType: "전세",
      price: "2억 6,000만원",
      priceValue: 26000,
      area: "115㎡ (공급 35평 / 전용 84㎡)",
      floor: "22층 / 28층",
      rooms: "방 3개 · 욕실 2개",
      maintenanceFee: "약 18만원",
      direction: "남서향 (낙동강 영구조망)",
      moveInDate: "2026년 11월 협의",
      builtYear: "2010년 (깨끗한 첫 입주급 관리)",
      parking: "세대당 1.3대",
      image: "images/hero_busan.jpg",
      tags: ["#낙동강뷰", "#대단지", "#사상하단선수혜", "#안심전세"],
      isFeatured: true,
      rating: "4.92",
      reviewCount: 12,
      description: "낙동강 일몰이 한눈에 들어오는 영구 강변 조망 로얄동 매물입니다. 사상-하단선 도시철도 개통 호재 지역으로 출퇴근이 더욱 편리해질 단지이며, 융자 없는 1순위 안심 전세 매물로 HUG/SGI 전세보증보험 100% 가입 가능합니다.",
      amenities: [
        { icon: "eye", label: "거실 낙동강 파노라마 영구 조망" },
        { icon: "shield-check", label: "융자 0원 1순위 안심 전세 보증" },
        { icon: "trees", label: "단지 내 산책로 및 피트니스센터" },
        { icon: "school", label: "엄궁초·엄궁중 도보 5분 통학권" },
        { icon: "bus", label: "하단·남포·사상 방면 시내버스 다수" },
        { icon: "box", label: "각 침실 대형 붙박이장 시공" }
      ],
      agentNotes: "현재 임차인 거주 중이나 평일 저녁 및 주말 사전예약 시 집 보기 수월합니다."
    },
    {
      id: "HOUSE-01",
      category: "house",
      categoryName: "주택",
      title: "학장동 도심 속 마당 넓은 2층 남향 단독주택",
      district: "학장동",
      location: "부산 사상구 학장동 240번지 일원",
      dealType: "매매",
      price: "4억 9,000만원",
      priceValue: 49000,
      area: "대지 205㎡ (62평) / 연면적 178㎡ (54평)",
      floor: "지상 2층 단독주택",
      rooms: "방 5개 · 욕실 3개 (1층 방3/욕2, 2층 방2/욕1)",
      maintenanceFee: "자체관리",
      direction: "남향",
      moveInDate: "즉시입주 가능",
      builtYear: "1998년 (2023년 지붕방수 및 샷시 전면 교체)",
      parking: "전용 마당 내 자주식 2대 가능",
      image: "images/apt_interior.jpg",
      tags: ["#마당있는집", "#2세대거주", "#차고완비", "#학장천산책로"],
      isFeatured: false,
      rating: "4.88",
      reviewCount: 9,
      description: "도심 속에서 텃밭과 잔디마당을 누릴 수 있는 보기 드문 정남향 단독주택입니다. 1층과 2층 독립 출입구가 있어 2세대 독립 거주나 2층 임대(보증금 3천/월 50만)를 통해 고정 수익 창출도 가능합니다. 넓은 옥상에서 바베큐 파티와 태양광 설치가 가능합니다.",
      amenities: [
        { icon: "sun", label: "온종일 볕이 잘 드는 정남향 마당" },
        { icon: "car", label: "내 집 마당 전용 주차 2대 확보" },
        { icon: "layers", label: "1·2층 분리 구조로 부분 임대 가능" },
        { icon: "wrench", label: "외벽 방수 및 LG하우시스 이중창호 완비" },
        { icon: "feather", label: "개인 텃밭 및 화단 가꾸기 최적" },
        { icon: "map-pin", label: "학장천 생태하천길 도보 3분" }
      ],
      agentNotes: "대지 평단가 환산 시 790만원대로 주변 실거래가 대비 매우 합리적으로 책정되었습니다."
    },
    {
      id: "STORE-01",
      category: "store",
      categoryName: "상가점포",
      title: "사상역 3번출구 메인 먹자상권 1층 코너 상가",
      district: "괘법동",
      location: "부산 사상구 괘법동 530번지",
      dealType: "월세",
      price: "보증금 5,000만 / 월 320만원",
      priceValue: 5000,
      area: "전용 89.2㎡ (27평) / 계약 112㎡ (34평)",
      floor: "1층 / 지상 5층",
      rooms: "내부 전용 남녀 분리화장실",
      maintenanceFee: "월 15만원 (공용관리비)",
      premiumFee: "권리금 협의 (동종업계 파격조정 가능)",
      currentUse: "유명 프랜차이즈 디저트 카페 운영 중",
      recommendedUse: "카페, 베이커리, 브런치, 수제맥주, 뷰티살롱, 병원/약국",
      expectedYield: "연 5.8%",
      footTraffic: "일평균 유동인구 35,000명 이상 (사상역 환승구역)",
      image: "images/store_street.jpg",
      tags: ["#사상역초역세권", "#1층코너", "#가시성최고", "#유동인구폭발"],
      isFeatured: true,
      rating: "4.98",
      reviewCount: 24,
      description: "사상역 지하철 2호선 및 김해경전철 더블역세권 1층 황금 코너 상가입니다. 전면 유리가 12m 이상 확보되어 가시성과 홍보 효과가 독보적이며, 삼락생태공원 나들이객과 사상터미널 유동인구가 집중되는 메인 통로입니다.",
      stripeSpecs: [
        { label: "보증금 / 월차임", value: "5,000만원 / 320만원 (VAT별도)" },
        { label: "권리금", value: "시설·바닥권리금 협의 (최대한 조율 지원)" },
        { label: "전용면적 / 층수", value: "89.2㎡ (약 27평) / 1층 전면 코너" },
        { label: "수전 및 전기용량", value: "전기 30kW 승압 완료, 도시가스 인입" },
        { label: "주차 및 편의", value: "건물 후면 주차 4대 가능, 전용 화장실" },
        { label: "입점 추천업종", value: "카페, 베이커리, 호프/주점, 헤어샵, 이동통신" }
      ],
      agentNotes: "현재 성업 중인 매물로 현장 답사 시 사전 조율이 필요합니다. 매출장부 및 상권분석 보고서를 사무실 내방 시 브리핑해 드립니다."
    },
    {
      id: "STORE-02",
      category: "store",
      categoryName: "상가점포",
      title: "덕포역 1·2번 출구 역세권 1층 전면 무권리 상가 (참좋은부동산 인근)",
      district: "덕포동",
      location: "부산 사상구 덕포동 426-16 1층",
      dealType: "월세",
      price: "보증금 3,000만 / 월 160만원",
      priceValue: 3000,
      area: "전용 66㎡ (20평) / 계약 82㎡ (25평)",
      floor: "1층 / 지상 4층",
      rooms: "전용 화장실 및 탕비실 구비",
      maintenanceFee: "월 8만원",
      premiumFee: "무권리 (시설비 0원)",
      currentUse: "사무실 및 공실 (즉시 입주 가능)",
      recommendedUse: "부동산/행정사 사무실, 배달전문점, 플라워샵, 미용실, 편의점",
      expectedYield: "연 6.4%",
      footTraffic: "덕포역 1·2번 출구 및 사상도서관 메인 유동인구",
      image: "images/store_street.jpg",
      tags: ["#덕포역도보2분", "#1층무권리", "#사상도서관인근", "#즉시입주"],
      isFeatured: true,
      rating: "4.94",
      reviewCount: 15,
      description: "부산 2호선 덕포역 도보 2분 거리 1층 무권리 알짜 상가입니다. 전면 유리가 넓어 가시성이 우수하며, 사상도서관과 덕포1동 행정복지센터로 이어지는 메인 보행로에 위치해 생활밀착형 업종 및 사무실 창업에 강력 추천합니다.",
      stripeSpecs: [
        { label: "보증금 / 월차임", value: "3,000만원 / 160만원 (부가세 별도)" },
        { label: "권리금", value: "권리금 없음 (무권리 특급조건)" },
        { label: "전용면적 / 층수", value: "66㎡ (약 20평) / 1층 전면" },
        { label: "전기 및 수도", value: "기본 15kW, 상하수도 직결" },
        { label: "교통 조건", value: "덕포역 1·2번 출구 도보 2분 (150m)" }
      ],
      agentNotes: "임대인분 성향이 매우 온화하여 장기 임차 안정성이 보장되며, 렌트프리 1개월 협의 가능합니다."
    },
    {
      id: "OFFICE-01",
      category: "office",
      categoryName: "사무실",
      title: "부산진구 당감동 대로변 신축 3층 메디컬·사무실 임대 (기타구 추천)",
      district: "기타구 (부산진구)",
      location: "부산 부산진구 당감동 대로변",
      dealType: "월세",
      price: "보증금 3,000만 / 월 180만원",
      priceValue: 3000,
      area: "전용 118㎡ (약 36평) / 계약 152㎡",
      floor: "3층 / 지상 7층 (엘리베이터 완비)",
      rooms: "내부 남녀 분리 화장실, 탕비실",
      maintenanceFee: "월 18만원",
      premiumFee: "무권리금 신축 첫 입주",
      currentUse: "공실 (신축 준공 완료)",
      recommendedUse: "일반 사무실, IT 기업, 법무·세무사무소, 병의원, 학원",
      expectedYield: "연 5.6%",
      footTraffic: "대로변 버스정류장 바로 앞, 유동인구 풍부",
      image: "images/store_street.jpg",
      tags: ["#기타구추천", "#무권리신축", "#사무실임대", "#엘리베이터"],
      isFeatured: false,
      rating: "4.90",
      reviewCount: 6,
      description: "부산 전지역 사옥 및 사무실 이전을 원하시는 대표님께 추천드리는 부산진구 대로변 신축 무권리 매물입니다. 사상구와 인접하여 부산 전역 이동이 수월하며 주차 및 엘리베이터 시설이 완비되어 있습니다.",
      stripeSpecs: [
        { label: "보증금 / 월차임", value: "3,000만원 / 180만원 (VAT별도)" },
        { label: "권리금", value: "무권리금 (신축 첫 입주 특권)" },
        { label: "전용면적 / 층수", value: "118㎡ (약 36평) / 지상 3층" },
        { label: "냉난방 / 시설", value: "천장형 시스템 냉난방기 2대 완비" },
        { label: "주차 및 편의", value: "자주식+기계식 주차 1대 무료" },
        { label: "추천 용도", value: "일반 사무실, 지사, 세무/법무, 학원" }
      ],
      agentNotes: "부산 전지역 네트워크를 통해 고객님이 원하시는 사무실 조건을 딱 맞춤으로 찾아드립니다."
    },
    {
      id: "BUILD-01",
      category: "building",
      categoryName: "빌딩건물",
      title: "사상역 역세권 대로변 5층 올근생 수익형 상가빌딩 (만실 운영)",
      district: "괘법동",
      location: "부산 사상구 괘법동 광장로 대로변",
      dealType: "매매",
      price: "32억원",
      priceValue: 320000,
      area: "대지 330㎡ (100평) / 연면적 990㎡ (300평)",
      floor: "지하 1층 ~ 지상 5층 (승강기 완비)",
      rooms: "전층 상가 및 사무실 임대 (총 8개 호실)",
      maintenanceFee: "자체관리",
      direction: "남서향",
      moveInDate: "협의가능",
      builtYear: "2018년 (내외관 최상급 컨디션)",
      image: "images/hero_busan.jpg",
      tags: ["#사상역대로변", "#수익형빌딩", "#수익률연5.4%", "#올근생", "#엘리베이터"],
      isFeatured: true,
      rating: "4.99",
      reviewCount: 16,
      description: "사상역 복합환승센터 및 경전철 환승역세권 대로변에 위치한 가시성 탁월한 5층 올근생 상가빌딩입니다. 1층 약국 및 대형 프랜차이즈, 상층부 의원·학원·사무실로 전층 공실 없이 만실 임대 운영 중이며 안정적인 월세 수익과 향후 사상스마트시티 연계 시세차익이 확실한 우량 자산 매물입니다.",
      stripeSpecs: [
        { label: "매매 가격", value: "32억원 (대출 승계 가능)" },
        { label: "대지 / 연면적", value: "대지 100평 / 연면적 300평 (지하1~지상5층)" },
        { label: "보증금 / 월세", value: "총 보증금 3억 5,000만원 / 월 1,280만원" },
        { label: "연간 임대수익률", value: "연 5.39% (고수익 알짜 빌딩)" },
        { label: "승강기 및 주차", value: "최신 10인승 엘리베이터 완비, 자주식 6대" },
        { label: "용도지역 / 추천", value: "일반상업지역 / 자산가 사옥 및 임대수익형" }
      ],
      agentNotes: "법인 및 개인 자산가 고객님께 강력 추천드리는 알짜 빌딩입니다. 세무사 및 법무사 협업으로 취득세 절세 및 명의 플랜까지 원스톱으로 지원해 드립니다."
    },
    {
      id: "FACTORY-01",
      category: "factory",
      categoryName: "공장창고",
      title: "감전동 스마트그린공단 층고 9m 호이스트 5톤 신축급 공장",
      district: "감전동",
      location: "부산 사상구 감전동 공업지역 내",
      dealType: "매매",
      price: "18억 5,000만원",
      priceValue: 185000,
      area: "대지 661㎡ (200평) / 연면적 495㎡ (150평)",
      floor: "지상 1층 (내부 복층 사무동 25평 별도)",
      rooms: "사무실, 연구실, 샤워실 완비",
      ceilingHeight: "유효 층고 9.2m",
      hoist: "호이스트 5톤 1기 (주행 상태 최상)",
      powerCapacity: "수전용량 250kW (대용량 전력)",
      trailerAccess: "40ft 대형 트레일러 및 츄레라 진출입 원활",
      roadWidth: "전면 12m 아스팔트 포장도로 접함",
      industrialZone: "준공업지역 (공장등록증 즉시 발급 가능)",
      image: "images/factory_commercial.jpg",
      tags: ["#사상스마트시티", "#호이스트5T", "#동력250kW", "#트레일러진입", "#사무동완비"],
      isFeatured: true,
      rating: "5.0",
      reviewCount: 31,
      description: "사상구 감전동 공업지역 중심에 위치한 알짜 공장입니다. 사상스마트시티 재생사업 지구 인접으로 미래 지가 상승이 보장되며, 5톤 호이스트와 층고 9.2m로 정밀가공, 금형, 사출, 자동화설비, 물류창고 등 다양한 업종에 최적화되어 있습니다. 사무동과 기숙사 시설이 완비되어 리모델링 비용이 전혀 들지 않습니다.",
      stripeSpecs: [
        { label: "매매 가격", value: "18억 5,000만원 (평당 약 925만원)" },
        { label: "토지 / 건물 면적", value: "대지 200평 / 건물 150평 (사무동 포함 175평)" },
        { label: "건물 층고 (Height)", value: "처마 기준 9.2m (중량물 취급 용이)" },
        { label: "크레인 / 호이스트", value: "5톤 크레인 1기 설치 완비 (안전검사필)" },
        { label: "전력 및 유틸리티", value: "동력 250kW 인입, 에어배관 설치완료" },
        { label: "도로 접근성", value: "12m 광폭도로 접함, 40피트 콘테이너 회전 가능" },
        { label: "용도지역 / 인허가", value: "준공업지역 (공장등록 즉시 가능, 오폐수 협의)" }
      ],
      agentNotes: "현재 자가 공장으로 운영 중이며 매수인의 일정에 맞춰 명도 시기 협의 가능합니다. 정책자금 대출(감정가 대비 최대 80%) 연계 지원 가능합니다."
    },
    {
      id: "FACTORY-02",
      category: "factory",
      categoryName: "공장창고",
      title: "모라동 첨단 지식산업센터 드라이브인 공장/창고",
      district: "모라동",
      location: "부산 사상구 모라동 벤처밸리",
      dealType: "임대",
      price: "보증금 2,500만 / 월 210만원",
      priceValue: 2500,
      area: "전용 165㎡ (50평) / 계약 280㎡ (85평)",
      floor: "4층 / 지상 15층 (호실 앞 주차 및 하역 가능)",
      ceilingHeight: "유효 층고 5.8m",
      hoist: "화물용 리프트 3.5톤 완비",
      powerCapacity: "동력 50kW",
      trailerAccess: "화물차량 5톤 도어투도어(Door-to-Door) 진입",
      roadWidth: "대로변 접함",
      industrialZone: "지식산업센터 (제조형)",
      image: "images/factory_commercial.jpg",
      tags: ["#드라이브인", "#도어투도어", "#하역편리", "#관리비저렴"],
      isFeatured: false,
      rating: "4.90",
      reviewCount: 8,
      description: "호실 문 앞까지 5톤 트럭이 직접 진입하여 상하차가 가능한 드라이브인(Drive-in) 시스템 제조형 공장입니다. 층고 5.8m로 복층 사무실 시공이 가능하며, 구내식당·회의실·샤워실 등 쾌적한 부대시설을 갖추고 있습니다.",
      stripeSpecs: [
        { label: "보증금 / 월세", value: "2,500만원 / 210만원" },
        { label: "전용 / 분양면적", value: "165㎡ (50평) / 280㎡ (85평)" },
        { label: "물류 시스템", value: "드라이브인 호실 앞 5톤 트럭 주차·하역" },
        { label: "층고 및 바닥하중", value: "층고 5.8m / 바닥하중 1.2t/㎡" },
        { label: "전력 및 설비", value: "기본 50kW, FCU 냉난방 설비 구비" }
      ],
      agentNotes: "제조업뿐만 아니라 e-커머스 물류센터, 정밀 조립 라인 입주사에게 인기가 높은 호실입니다."
    },
    {
      id: "LAND-01",
      category: "land",
      categoryName: "토지",
      title: "엄궁동 사상스마트시티 인접 제2종일반주거 나대지",
      district: "엄궁동",
      location: "부산 사상구 엄궁동 대로변 인근",
      dealType: "매매",
      price: "11억 2,000만원",
      priceValue: 112000,
      area: "대지 429㎡ (약 130평)",
      floor: "토지 (평탄지 나대지)",
      zoning: "제2종일반주거지역",
      coverageRatio: "건폐율 60% 이하 / 용적률 220% 이하",
      roadContact: "6m 소로 접함 (건축허가 완비)",
      currentStatus: "나대지 (지상 건축물 없음, 즉시 착공 가능)",
      recommendedUse: "신축 다가구주택, 근린생활시설 사옥, 주차장, 물류적재장",
      image: "images/hero_busan.jpg",
      tags: ["#즉시착공", "#사옥부지", "#건축허가완료", "#투자용토지"],
      isFeatured: false,
      rating: "4.85",
      reviewCount: 7,
      description: "사상스마트시티와 엄궁농산물도매시장 인근의 반듯한 사각형태 나대지입니다. 현재 지상 건축물이 없어 철거 비용이 들지 않으며, 도시가스 및 상하수도 인입이 완료되어 다가구주택 신축이나 소형 기업 사옥 신축에 최적의 요건을 갖추고 있습니다.",
      stripeSpecs: [
        { label: "토지 면적", value: "429㎡ (130평)" },
        { label: "용도지역 / 지목", value: "제2종일반주거지역 / 지목: 대(垈)" },
        { label: "건폐율 / 용적률", value: "법정 건폐율 60% / 용적률 220%" },
        { label: "도로 조건", value: "폭 6m 포장도로 접 (차량 양방향 교행)" },
        { label: "권리 관계", value: "소유권 1인 단독, 근저당 0원 무융자 깨끗함" }
      ],
      agentNotes: "사상구 일대 나대지 희소성으로 인해 향후 시세차익과 임대사업 목적에 모두 부합합니다."
    }
  ],

  // 2. 네이버 블로그 콘텐츠 (썸네일 + 요약내용)
  blogPosts: [
    {
      id: "BLOG-01",
      title: "[현장답사] 감전동 200평 공장 급매물 실사기! 층고 9m에 호이스트 상태 점검",
      category: "공장/창고 실전분석",
      date: "2026.09.22",
      views: "1,420회",
      comments: "14개",
      thumbnail: "images/factory_commercial.jpg",
      excerpt: "오늘은 사상구 감전동 공업지역 중심에 나온 실속형 공장을 직접 다녀왔습니다. 크레인 5톤 작동 상태와 40피트 트레일러 진입 각도를 실측해 드렸습니다. 정책자금 대출 팁까지 블로그에서 확인하세요!",
      link: "https://blog.naver.com",
      author: "신제환 대표"
    },
    {
      id: "BLOG-02",
      title: "사상역 먹자골목 1층 상가 임대차 분석! 무권리 전환 가능성과 추천 업종",
      category: "상가 상권 브리핑",
      date: "2026.09.18",
      views: "2,150회",
      comments: "28개",
      thumbnail: "images/store_street.jpg",
      excerpt: "사상역 3번 출구 일일 유동인구 3만 5천명의 실제 동선을 분석했습니다. 배후 주거단지와 직장인 회식 수요를 동시에 흡수할 수 있는 베이커리 카페 및 프랜차이즈 창업자 필독 가이드입니다.",
      link: "https://blog.naver.com",
      author: "신제환 대표"
    },
    {
      id: "BLOG-03",
      title: "2026 하반기 사상구 아파트 매매 동향: 괘법동 vs 엄궁동 실거래가 비교",
      category: "아파트 시세분석",
      date: "2026.09.12",
      views: "3,890회",
      comments: "42개",
      thumbnail: "images/apt_interior.jpg",
      excerpt: "금리 인하 기조와 사상-하단선 완공 가시화에 따른 사상구 주요 대단지 아파트의 매매·전세 호가 변동을 국토교통부 실거래 데이터 기반으로 명쾌하게 짚어드립니다.",
      link: "https://blog.naver.com",
      author: "신제환 대표"
    },
    {
      id: "BLOG-04",
      title: "공장 양도양수 시 부가가치세 포괄양수도 계약서 작성 시 주의할 3가지",
      category: "부동산 세무/법률",
      date: "2026.09.05",
      views: "1,870회",
      comments: "19개",
      thumbnail: "images/office_consultation.jpg",
      excerpt: "공장 매매 시 수천만원의 부가세 폭탄을 방지하기 위한 포괄양수도 특약 문구와 세무 신고 절차를 현직 공인중개사가 실제 계약 사례로 정리해 드립니다.",
      link: "https://blog.naver.com",
      author: "신제환 대표"
    }
  ],

  // 3. 부동산 뉴스 & 소식 게시판 데이터
  newsList: [
    {
      id: "NEWS-01",
      badge: "지역개발",
      badgeColor: "gold",
      title: "부산시, 사상스마트시티 재생사업 2단계 착공… 서부산 첨단산업 허브 도약",
      source: "부산광역시청 보도자료",
      date: "2026.09.25",
      summary: "부산광역시는 노후된 사상공업지역을 미래형 혁신산단으로 탈바꿈하는 '사상스마트시티' 재생사업의 2단계 공사를 본격 착공한다고 밝혔다. 첨단 제조 및 지식기반 기업 입주 인센티브가 대폭 확대된다.",
      content: "부산시 관계자는 '사상스마트시티는 서부산청사와 함께 서부산권 균형발전의 핵심 엔진'이라며, '스마트 물류와 로봇, 바이오 소재 등 첨단 기술기업 유치를 위해 용적률 상향과 세제 혜택을 집중 지원할 방침'이라고 설명했다."
    },
    {
      id: "NEWS-02",
      badge: "교통인프라",
      badgeColor: "blue",
      title: "사상~해운대 지하고속도로 환경영향평가 통과… 동서부산 30분대 연결 가시화",
      source: "국토교통부",
      date: "2026.09.20",
      summary: "남해고속도로 제2지선 사상JCT와 동해고속도로 송정IC를 잇는 사상-해운대 고속도로 사업이 행정 절차를 매듭짓고 순항 중이다. 완공 시 사상구는 광역 교통망의 최대 수혜지가 될 전망이다.",
      content: "상습 정체 구간인 만덕대로와 백양터널을 우회하여 사상에서 센텀 및 오시리아 관광단지까지 직통으로 이동할 수 있어, 사상구 내 물류 및 주거 인프라 가치가 동반 상승할 것으로 기대된다."
    },
    {
      id: "NEWS-03",
      badge: "금융·금리",
      badgeColor: "green",
      title: "한국은행 기준금리 인하 기조 반영, 주택담보대출 및 기업 시설자금 금리 안정세",
      source: "금융위원회",
      date: "2026.09.15",
      summary: "시중은행 주택담보대출 고정금리가 3%대 초중반에 안착하면서 실수요자의 내 집 마련 문의와 제조기업의 공장 매입 시설자금 대출 실행 건수가 뚜렷한 회복세를 보이고 있다.",
      content: "중소벤처기업진흥공단 및 부산신용보증재단의 제조공장 이전 및 시설현대화 정책자금 역시 금리 우대 혜택을 제공하고 있어, 공장 매매를 검토 중인 대표님들의 적기 매수 기회로 평가된다."
    },
    {
      id: "NEWS-04",
      badge: "세무가이드",
      badgeColor: "purple",
      title: "2026년 주택 취득세 중과 완화 및 1세대 1주택 특례 연장 안내",
      source: "행정안전부 세제실",
      date: "2026.09.10",
      summary: "일시적 2주택 처분 기한이 3년으로 유지되며, 생애최초 주택 구입자에 대한 200만원 한도 취득세 면제 혜택이 연장 시행된다.",
      content: "주거용 부동산 취득 계획이 있는 실수요자는 본인의 주택 수 산정 기준(분양권, 입주권 포함 여부)을 사전에 공인중개사와 확인 후 계약하는 것이 세금 리스크를 예방하는 지름길이다."
    }
  ],

  // 4. 고객 후기 게시판 데이터
  reviews: [
    {
      id: "REV-01",
      name: "성*철 대표님 (삼양정밀)",
      dealType: "공장창고 매매",
      category: "factory",
      categoryName: "공장창고",
      rating: 5,
      date: "2026.09.19",
      propertyTitle: "감전동 200평 호이스트 5톤 공장 매입",
      content: "공장 이전 때문에 사상구 일대 부동산 대여섯 군데를 다녔는데, 참좋은 신제환 대표님만큼 전력 수전용량, 층고, 진입도로 도로점용 허가까지 꼼꼼하게 챙겨주신 분이 없었습니다. 까다로운 공장등록증 인허가 절차도 끝까지 동행해 주셔서 안심하고 공장 가동 중입니다. 정말 최고입니다!",
      verifiedBadge: "실매물 공장계약 완료"
    },
    {
      id: "REV-02",
      name: "이지* 님 (직장인)",
      dealType: "아파트 매매",
      category: "apartment",
      categoryName: "아파트",
      rating: 5,
      date: "2026.09.14",
      propertyTitle: "괘법 한신2차 33평형 로얄층 내집마련",
      content: "생애 첫 내 집 마련이라 모르는 것도 많고 겁이 났는데, 등기부등본 권리분석부터 디딤돌 대출 연계까지 하나하나 가족 일처럼 챙겨주셨어요. 거실 뷰도 너무 좋고 올리모델링 상태라 도배만 하고 바로 들어왔습니다. 사상구 아파트 구할 땐 무조건 참좋은부동산 강추합니다!",
      verifiedBadge: "실거래 등기이전 완료"
    },
    {
      id: "REV-03",
      name: "박동* 대표님 (온지카페)",
      dealType: "상가점포 임대",
      category: "store",
      categoryName: "상가점포",
      rating: 5,
      date: "2026.09.08",
      propertyTitle: "사상역 메인 1층 코너 카페 창업",
      content: "유동인구 분석 데이터 표와 시간대별 보행자 흐름을 객관적인 자료로 보여주셔서 창업 결정을 내릴 수 있었습니다. 권리금 협상도 임대인과 원만하게 조율해 주셔서 예산을 크게 절감했습니다. 오픈 첫 달부터 매출이 잘 나와서 너무 감사드립니다.",
      verifiedBadge: "상가 임대차계약 완료"
    },
    {
      id: "REV-04",
      name: "최영* 님 (임대사업자)",
      dealType: "단독주택 매매",
      category: "house",
      categoryName: "주택",
      rating: 5,
      date: "2026.08.29",
      propertyTitle: "학장동 2층 남향 단독주택 매수",
      content: "마당 있고 부모님과 함께 살 수 있는 주택을 1년 넘게 찾았는데 참좋은부동산 덕분에 딱 맞는 물건을 찾았습니다. 건물 노후도 검사와 누수 여부까지 사전 체크해 주셔서 아주 신뢰가 갔습니다. 좋은 집 중개해 주셔서 감사합니다.",
      verifiedBadge: "단독주택 소유권이전"
    },
    {
      id: "REV-05",
      name: "김만* 대표님 (물류유통)",
      dealType: "공장창고 임대",
      category: "factory",
      categoryName: "공장창고",
      rating: 5,
      date: "2026.08.15",
      propertyTitle: "삼락동 대형 물류창고 300평 임대",
      content: "대형 츄레라 진출입이 필수라 매물 구하기가 정말 어려웠는데, 40피트 차량 회전각 나오는 부지를 귀신같이 찾아주셨습니다. 보증금 조율도 만족스럽고 법률 자문도 훌륭합니다.",
      verifiedBadge: "물류창고 계약완료"
    },
    {
      id: "REV-06",
      name: "정*우 대표님 (IT솔루션)",
      dealType: "사무실 임대",
      category: "office",
      categoryName: "사무실",
      rating: 5,
      date: "2026.08.08",
      propertyTitle: "사상스마트시티 쾌적한 40평 사옥 이전",
      content: "개발팀 인원이 늘어나면서 주차와 교통이 편리한 사옥 이전을 고민했는데, 모라 벤처밸리 쪽 최상급 컨디션 사무실을 신속하게 중개해 주셨습니다. 렌트프리 협상부터 인테리어 공사 기간까지 배려받을 수 있게 조율해 주셔서 감사합니다!",
      verifiedBadge: "사무실 임대차계약 완료"
    },
    {
      id: "REV-07",
      name: "송*호 대표님 (자산운용)",
      dealType: "빌딩 매매",
      category: "building",
      categoryName: "빌딩건물",
      rating: 5,
      date: "2026.07.25",
      propertyTitle: "사상역 대로변 5층 올근생 상가빌딩 매입",
      content: "은퇴 후 안정적인 현금흐름을 위한 수익형 빌딩을 찾고 있었는데, 신제환 대표님의 정밀한 임대수익률 분석과 권리분석 덕분에 확신을 갖고 계약했습니다. 복잡한 취득세 및 법인 명의 이전 절차도 세무사 연계로 깔끔하게 처리되었습니다.",
      verifiedBadge: "상가빌딩 소유권이전"
    },
    {
      id: "REV-08",
      name: "한*수 대표님 (시행개발)",
      dealType: "토지 매매",
      category: "land",
      categoryName: "토지",
      rating: 5,
      date: "2026.07.12",
      propertyTitle: "엄궁동 130평 신축 나대지 매수 및 개발자문",
      content: "사상스마트시티 배후부지 토지를 찾던 중 엄궁동 알짜 나대지를 소개해 주셨습니다. 건폐율, 용적률, 도로점용 허가 여부까지 구청 인허가 사항을 사전에 완벽히 검토해 주셔서 안심하고 매수했습니다.",
      verifiedBadge: "토지 매매계약 완료"
    }
  ],

  // 5. 실시간 상담 현황 티커 (상담게시판 연동)
  recentConsultations: [
    { name: "김*호 대표님", target: "감전동 250평 공장 매매 문의", time: "10분 전", status: "상담접수" },
    { name: "박*준 고객님", target: "괘법동 아파트 매매 급매 상담", time: "32분 전", status: "배정완료" },
    { name: "최*영 대표님", target: "사상역 역세권 1층 상가 임차", time: "1시간 전", status: "상담완료" },
    { name: "정*숙 고객님", target: "엄궁동 단독주택 매도 의뢰", time: "2시간 전", status: "상담완료" },
    { name: "윤*식 대표님", target: "모라동 드라이브인 공장 임대", time: "3시간 전", status: "상담완료" }
  ],

  // 6. 부동산 정보란 토픽 가이드
  infoGuides: [
    {
      id: "GUIDE-01",
      title: "2026년 주택·상가 취득세 및 양도소득세 절세 비법",
      category: "세무 가이드",
      badge: "필독",
      date: "2026.09.20",
      content: "부동산 취득 시 주택 수 판정 요건, 상가·공장의 포괄양수도 특약 작성법, 1세대 1주택 비과세 보유·거주 요건을 상세히 안내해 드립니다. 세무 리스크를 제로(0)로 만드는 핵심 노하우를 확인하세요."
    },
    {
      id: "GUIDE-02",
      title: "사상공단(사상스마트시티) 공장 매매 시 필수 체크 5계명",
      category: "공장/산업",
      badge: "사상특화",
      date: "2026.09.15",
      content: "1. 수전용량(kW) 증설 가능 여부, 2. 호이스트 설치 하중 및 정기안전검사 이력, 3. 전면도로 폭과 대형차량 회전반경, 4. 폐수 및 환경배출시설 인허가 구역, 5. 토양오염정밀조사 대상 여부를 반드시 사전 확인해야 합니다."
    },
    {
      id: "GUIDE-03",
      title: "상가건물 임대차보호법 10년 갱신요구권과 권리금 회수 기회",
      category: "상가/창업",
      badge: "법률가이드",
      date: "2026.09.10",
      content: "임차인의 계약갱신요구권(최초 계약 포함 10년)과 임대차 종료 6개월 전부터 보장되는 권리금 회수 기회 보호 규정을 숙지하여 임대인과 임차인 모두 분쟁 없는 상생 계약을 체결하는 가이드입니다."
    },
    {
      id: "GUIDE-04",
      title: "사상-해운대 지하고속도로 및 사상역 복합환승센터 개발 로드맵",
      category: "지역 호재",
      badge: "미래가치",
      date: "2026.09.01",
      content: "서부산의 관문 사상역 일대가 KTX, 부전-마산 복선전철, 사상-하단선 도시철도, 사상-해운대 대심도 도로로 연결되는 쿼드러플 광역 교통 허브로 도약하는 현장 분석입니다."
    }
  ],

  // 7. 공인중개사사무소 공식 정보
  officeInfo: {
    name: "참좋은공인중개사사무소",
    representative: "신제환",
    phone: "010-9667-4201",
    regNumber: "26530-2026-00009",
    address: "부산광역시 사상구 덕포동 426-16 1층",
    hours: "월~토 09:00 ~ 20:00 (일요일 사전예약 상담)",
    slogan: "사장님의 내일을 짓다 · 참좋은 공인중개사 사무소",
    quote: "고객님이 원하시는 최적의 매물을 전문적이고 꼼꼼하게 딱 찾아드리겠습니다. 정직과 신뢰로 사장님의 내일을 함께 짓겠습니다."
  }
};

if (typeof window !== 'undefined') {
  window.REAL_ESTATE_DATA = REAL_ESTATE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = REAL_ESTATE_DATA;
}
