/**
 * 참좋은부동산 (부산광역시 사상구) - 웹사이트 통합 데이터
 * 아파트, 주택, 상가·사무실, 공장, 토지, 네이버 블로그, 뉴스, 후기, 상담
 */

const REAL_ESTATE_DATA = {
  // 1. 매물 데이터 (블로그 100% 현장 검증 실매물 연동)
  properties: [
    {
        "id": "APT-224458326524",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "확 트인 낙동강 뻥뷰! 1억 7천만 원대 가성비 최고 아파트 매매 (덕포청구 104동 탑층)",
        "district": "덕포동",
        "location": "부산시 사상구 덕포동 58 (덕포청구 104동)",
        "dealType": "매매",
        "price": "1억 7,200만원",
        "priceValue": 17200,
        "area": "공급 80.37㎡ / 전용 59.80㎡",
        "floor": "18층 (탑층) / 총 18층",
        "rooms": "방 3개 · 욕실 1개",
        "maintenanceFee": "약 15만원",
        "direction": "서향 (거실 기준 낙동강 파노라마 뷰)",
        "moveInDate": "즉시입주",
        "builtYear": "2001년 준공 (계단식)",
        "parking": "세대당 1.1대",
        "image": "images/blog_hd_08.webp",
        "tags": [
            "#덕포청구아파트",
            "#낙동강뻥뷰",
            "#탑층매물",
            "#1억대아파트",
            "#사상구가성비"
        ],
        "isFeatured": true,
        "rating": "4.99",
        "reviewCount": 18,
        "blogLink": "https://blog.naver.com/toomany22/224458326524",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "앞 동 간섭 전혀 없이 탁 트인 시원한 낙동강 파노라마 영구 조망을 누리는 덕포청구 104동 탑층 실매물입니다.",
            "1억 7,200만원의 합리적인 초특급 착한 가격으로 실거주 및 소액 투자에 최적화된 가성비 아파트입니다.",
            "방 3개, 욕실 1개 실속형 계단식 평면으로 즉시 입주가 가능하며 관리비도 매우 저렴합니다."
        ],
        "description": "부산시 사상구 덕포동 덕포청구 아파트 104동 18층(탑층) 24평형 실매물입니다. 앞 동 간섭 없이 확 트인 시원한 낙동강 파노라마 뻥뷰를 자랑하며, 1억 7천만원대 특급 가성비와 즉시 입주 가능한 쾌적한 컨디션을 갖추고 있습니다.",
        "amenities": [
            {
                "icon": "sun",
                "label": "앞 동 막힘없는 낙동강 파노라마 영구 조망"
            },
            {
                "icon": "shield",
                "label": "층간소음 걱정 없는 18층 로얄 탑층"
            },
            {
                "icon": "truck",
                "label": "즉시 입주 가능 & 깔끔한 관리 상태"
            }
        ]
    },
    {
        "id": "APT-224456954842",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "4층이지만 7층 높이! 분수대와 예쁜 단지 정원이 한눈에 담기는 남향 뷰 맛집 (사상 중흥S-클래스)",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 그랜드센트럴)",
        "dealType": "매매",
        "price": "6억 2,000만원",
        "priceValue": 62000,
        "area": "공급 111.42㎡ / 전용 79.85㎡",
        "floor": "4층 (실제 7층 높이 개방감) / 총 38층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 16만원",
        "direction": "남향 (거실 기준 정원뷰)",
        "moveInDate": "입주시기는 협의",
        "builtYear": "2023년 준공 (1,572세대 신축 대단지)",
        "parking": "세대당 1.25대",
        "image": "images/blog_hd_01.webp",
        "tags": [
            "#사상중흥S클래스",
            "#덕포역초역세권",
            "#남향뷰맛집",
            "#정원분수대조망",
            "#신축대단지"
        ],
        "isFeatured": true,
        "rating": "4.98",
        "reviewCount": 24,
        "blogLink": "https://blog.naver.com/toomany22/224456954842",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "1,572세대 사상구 랜드마크 신축 대단지 아파트의 독보적인 남향 정원 조망 실매물입니다.",
            "단지 단차 설계로 4층이지만 실제 7층 이상의 시원한 개방감과 예쁜 분수대 뷰를 누립니다.",
            "부산 지하철 2호선 덕포역 초역세권과 사상도서관을 품은 최상의 주거 인프라를 갖추고 있습니다."
        ],
        "description": "부산 사상구 덕포동 사상 중흥S-클래스 그랜드센트럴 33평형 실매물입니다. 4층이지만 단지 높이 단차로 실제 7층 이상의 시원한 개방감을 자랑하며, 거실에서 분수대와 정원이 한눈에 펼쳐지는 따뜻한 남향 세대입니다.",
        "amenities": [
            {
                "icon": "sun",
                "label": "채광과 조망이 탁월한 정남향 단지정원 뷰"
            },
            {
                "icon": "train",
                "label": "부산 2호선 덕포역 도보 3분 초역세권"
            },
            {
                "icon": "shield",
                "label": "1,572세대 최신식 커뮤니티 및 보안 완비"
            }
        ],
        "agentNotes": "직접 촬영한 100% 현장 검증 실매물입니다. 세부 사진과 동호수 조건은 블로그 포스팅에서 확인하실 수 있습니다."
    },
    {
        "id": "APT-224452416147",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "[사상중흥 탑층] 113동 121세대 33층 중에 단 2세대뿐인 귀한 탑층! 층간소음 0%",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 그랜드센트럴 113동)",
        "dealType": "매매",
        "price": "6억 8,000만원",
        "priceValue": 68000,
        "area": "공급 118.32㎡ / 전용 84.96㎡ (전용 84A타입)",
        "floor": "33층 탑층 / 총 33층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 17만원",
        "direction": "남향 (거실 기준)",
        "moveInDate": "2027년 7월 협의 (임대차 승계)",
        "builtYear": "2023년 준공",
        "parking": "세대당 1.25대",
        "image": "images/blog_hd_02.webp",
        "tags": [
            "#희귀탑층",
            "#층간소음해방",
            "#파노라마조망",
            "#중흥S클래스",
            "#사상역세권"
        ],
        "isFeatured": true,
        "rating": "5.0",
        "reviewCount": 19,
        "blogLink": "https://blog.naver.com/toomany22/224452416147",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "사상 중흥 113동 121세대 중 단 2세대만 존재하는 희소성 높은 최상층 33층 펜트급 탑층 매물입니다.",
            "위층이 없어 아이 키우는 가정이나 조용한 휴식을 원하는 분께 층간소음 0%의 완벽한 쾌적함을 선사합니다.",
            "사상 시가지와 산, 낙동강까지 이어지는 탁 트인 파노라마 영구 조망과 풍부한 일조권을 자랑합니다."
        ],
        "description": "사상 중흥S-클래스 113동 33층 최고층 매물입니다. 121세대 중 단 2세대뿐인 희소한 탑층으로 층간소음 걱정 없이 거주할 수 있습니다. 33평형 전용 84㎡ A타입 선호 판상형 구조로 맞통풍과 채광이 극대화되어 있습니다.",
        "amenities": [
            {
                "icon": "volume-x",
                "label": "층간소음 걱정 없는 최상층 단독 거주"
            },
            {
                "icon": "eye",
                "label": "사상 시가지 및 산맥 파노라마 뷰"
            },
            {
                "icon": "sun",
                "label": "하루 종일 막힘없는 일조권 확보"
            }
        ],
        "agentNotes": "안정적인 전세 갭투자 또는 실입주 협의가 가능합니다."
    },
    {
        "id": "APT-224450661854",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "[로얄동/조경뷰] 거실 소파에서 내 집 앞마당 같은 정원 뷰를 누리는 3층 꿀매물!",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 105동)",
        "dealType": "매매",
        "price": "6억 2,000만원",
        "priceValue": 62000,
        "area": "공급 104㎡ / 전용 74㎡ (인기 30평형)",
        "floor": "3층 / 총 3층 (저층 특화동)",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 15만원",
        "direction": "남향 (단지 내 중앙공원 조망)",
        "moveInDate": "즉시입주 협의가능",
        "builtYear": "2023년 준공",
        "parking": "지하 주차 완비",
        "image": "images/blog_hd_03.webp",
        "tags": [
            "#105동로얄동",
            "#조경뷰",
            "#30평형인기타입",
            "#즉시입주",
            "#아이키우기좋은집"
        ],
        "isFeatured": true,
        "rating": "4.94",
        "reviewCount": 16,
        "blogLink": "https://blog.naver.com/toomany22/224450661854",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "105동 중앙 조경공원 바로 앞에 위치하여 거실 창문 밖으로 푸른 숲과 나무가 가득 채워집니다.",
            "엘리베이터 대기 없이 계단 이용이 편리하여 어린 자녀나 어르신이 계신 가정에 강력 추천합니다.",
            "실속형 전용 74㎡ 구조로 관리비가 저렴하면서도 넉넉한 수납공간과 드레스룸을 갖추고 있습니다."
        ],
        "description": "거실에서 바로 정원을 내려다보는 힐링 조망 3층 매물입니다. 105동은 단지 내 보행로와 중앙광장 접근성이 뛰어나 산책과 운동을 즐기기에 가장 좋은 동입니다.",
        "amenities": [
            {
                "icon": "trees",
                "label": "사계절 변화를 감상하는 단지 조경뷰"
            },
            {
                "icon": "shield",
                "label": "아이들이 안전하게 뛰어놀 수 있는 단지 환경"
            }
        ],
        "agentNotes": "즉시 입주 협의 가능하며 꼼꼼하게 실내 상태를 검증 완료한 A급 매물입니다."
    },
    {
        "id": "APT-224446898959",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "선호도 1위 4Bay 판상형 구조로 모든 방과 거실에서 낙동강 리버뷰, 도심 야경 영구 조망!",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 110동)",
        "dealType": "매매",
        "price": "6억 6,000만원",
        "priceValue": 66000,
        "area": "공급 111.42㎡ / 전용 79.85㎡",
        "floor": "중층 / 총 38층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 16만원",
        "direction": "남서향 (오전 일조 + 저녁 노을)",
        "moveInDate": "협의가능",
        "builtYear": "2023년 준공",
        "parking": "세대당 1.25대",
        "image": "images/blog_hd_04.webp",
        "tags": [
            "#110동로얄층",
            "#낙동강리버뷰",
            "#석양노을뷰",
            "#4Bay판상형",
            "#사상역세권"
        ],
        "isFeatured": true,
        "rating": "4.97",
        "reviewCount": 20,
        "blogLink": "https://blog.naver.com/toomany22/224446898959",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "110동 남서향 라인으로 오전에는 밝은 햇살, 해 질 녘에는 낙동강 붉은 노을이 파노라마로 펼쳐집니다.",
            "모든 침실과 거실이 전면을 향하는 정통 4Bay 판상형 특화 설계로 환기와 채광이 매우 탁월합니다.",
            "대형 팬트리 수납공간과 주방 다용도실이 넓게 빠져 주부님들의 선호도가 가장 높은 평면입니다."
        ],
        "description": "모든 방과 거실에서 낙동강 조망과 도심 야경을 동시에 감상할 수 있는 110동 로얄 매물입니다. 4Bay 혁신 평면 구조로 공간 활용도가 극대화되어 있습니다.",
        "amenities": [
            {
                "icon": "sun",
                "label": "환상적인 낙동강 석양과 리버뷰 조망"
            },
            {
                "icon": "wind",
                "label": "맞통풍 구조의 정통 4Bay 판상형 평면"
            }
        ],
        "agentNotes": "실거주 만족도가 가장 높은 동·호수로 조기 마감이 예상됩니다."
    },
    {
        "id": "APT-224445679762",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "[급매] 사상중흥S-클래스 112동 33평형! 지하철·도서관 3분 거리 뷰 맛집 로얄동",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 112동)",
        "dealType": "매매",
        "price": "5억 7,000만원",
        "priceValue": 57000,
        "area": "공급 111.42㎡ / 전용 79.85㎡",
        "floor": "9층 / 총 38층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 16만원",
        "direction": "남동향 (단지 및 도서관 조망)",
        "moveInDate": "즉시입주 가능",
        "builtYear": "2023년 준공",
        "parking": "세대당 1.25대",
        "image": "images/blog_hd_05.webp",
        "tags": [
            "#착한급매가",
            "#5억원대중흥",
            "#사상도서관인접",
            "#역세권",
            "#즉시입주"
        ],
        "isFeatured": true,
        "rating": "4.99",
        "reviewCount": 28,
        "blogLink": "https://blog.naver.com/toomany22/224445679762",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "시세 대비 매우 착한 5억 7천만원 특급 급매물로 33평형 신축 대단지 입성의 절호의 찬스입니다.",
            "112동은 덕포역 출구 및 사상도서관, 행정복지센터와 가장 가까워 단지 밖 생활 편의가 최고입니다.",
            "현재 공실 상태로 매수인의 이사 일정에 맞춰 즉시 입주 또는 빠른 잔금 처리가 가능합니다."
        ],
        "description": "시세 대비 수천만원 저렴하게 나온 112동 초급매 물건입니다. 덕포역과 사상도서관 출입구에 인접해 대중교통 이용과 아이들 공부 환경이 우수합니다.",
        "amenities": [
            {
                "icon": "zap",
                "label": "시세 대비 파격적인 급매 가격 책정"
            },
            {
                "icon": "book",
                "label": "사상도서관 도보 2분 거리 슬세권"
            }
        ],
        "agentNotes": "가장 먼저 거래될 1순위 가격 메리트 매물입니다."
    },
    {
        "id": "APT-224444038686",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "[로얄층 파노라마 뻥뷰] 105동 25층 고층 세대로 거실과 방마다 막힘없는 마운틴·시티뷰",
        "district": "덕포동",
        "location": "부산 사상구 덕포동 (사상 중흥S-클래스 105동)",
        "dealType": "매매",
        "price": "6억 2,000만원",
        "priceValue": 62000,
        "area": "공급 104㎡ / 전용 74㎡",
        "floor": "25층 / 총 38층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 15만원",
        "direction": "남동향 (거실 기준 파노라마 뻥뷰)",
        "moveInDate": "즉시입주 협의가능",
        "builtYear": "2023년 준공",
        "parking": "지하 주차 완비",
        "image": "images/blog_hd_06.webp",
        "tags": [
            "#25층고층",
            "#파노라마뻥뷰",
            "#마운틴조망",
            "#일조권최고",
            "#사상중흥"
        ],
        "isFeatured": true,
        "rating": "4.96",
        "reviewCount": 17,
        "blogLink": "https://blog.naver.com/toomany22/224444038686",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "105동 25층 초고층에 위치하여 앞 동 간섭이 전혀 없는 압도적인 영구 뻥뷰를 자랑합니다.",
            "거실과 모든 침실에서 백양산 푸른 능선과 사상 시가지 야경이 그림처럼 펼쳐집니다.",
            "하루 종일 풍부한 일조량과 시원한 자연 바람으로 사계절 내내 쾌적한 주거 컨디션을 유지합니다."
        ],
        "description": "앞 가림이 1%도 없는 영구 조망 25층 로얄층 세대입니다. 거실 창밖으로 펼쳐지는 백양산 마운틴뷰와 탁 트인 도심 전망은 사상구 내 독보적입니다.",
        "amenities": [
            {
                "icon": "eye",
                "label": "앞 동 간섭 0% 영구 파노라마 개방감"
            },
            {
                "icon": "sun",
                "label": "아침부터 오후 늦게까지 쏟아지는 햇살"
            }
        ],
        "agentNotes": "고층 조망권을 선호하시는 고객님께 강력 추천합니다."
    },
    {
        "id": "APT-224422568774",
        "category": "apartment",
        "categoryName": "아파트",
        "title": "부산진구 부암동 시민공원삼정그린코아더베스트 33평 매매 (부암초품아·시민공원 도보권)",
        "district": "기타구 (부산진구)",
        "location": "부산광역시 부산진구 부암동 (시민공원삼정그린코아더베스트)",
        "dealType": "매매",
        "price": "4억 9,500만원",
        "priceValue": 49500,
        "area": "공급 110㎡ / 전용 84㎡ (인기 33평형)",
        "floor": "중층 / 총 29층",
        "rooms": "방 3개 · 욕실 2개",
        "maintenanceFee": "약 16만원",
        "direction": "남향",
        "moveInDate": "협의가능",
        "builtYear": "2018년 준공",
        "parking": "세대당 1.2대",
        "image": "images/blog_hd_07.webp",
        "tags": [
            "#시민공원삼정그린코아",
            "#부암초품아",
            "#부산시민공원",
            "#착한가격",
            "#남향판상형"
        ],
        "isFeatured": true,
        "rating": "4.95",
        "reviewCount": 15,
        "blogLink": "https://blog.naver.com/toomany22/224422568774",
        "agentNickname": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "seoSummary": [
            "부산 최대 도심 녹지인 '부산시민공원'을 내 집 앞마당처럼 도보로 누리는 힐링 아파트입니다.",
            "부암초등학교를 품은 '초품아' 안심 통학 단지로 학부모님들의 만족도가 매우 높습니다.",
            "시세 대비 합리적이고 착한 4억원대 급매 가격으로 실거주 및 투자 가치가 충분합니다."
        ],
        "description": "부산진구 부암동 시민공원삼정그린코아더베스트 33평형 실매물입니다. 부암초품아 단지로 아이들 등하교가 안전하며, 부산시민공원과 이마트 트레이더스를 도보로 이용할 수 있는 탁월한 생활 인프라를 갖추고 있습니다.",
        "amenities": [
            {
                "icon": "school",
                "label": "부암초등학교 도보 1분 초품아 안심통학"
            },
            {
                "icon": "trees",
                "label": "부산시민공원 도보 5분 힐링 산책로"
            },
            {
                "icon": "sun",
                "label": "채광과 통풍이 우수한 정남향 판상형"
            }
        ],
        "agentNotes": "부산진구와 사상구를 잇는 핵심 주거지로 착한 매매가에 나온 추천 매물입니다."
    }
],

  // 2. 네이버 블로그 콘텐츠 (고품질 전문 지식 & 실전 분석 칼럼)
  blogPosts: [
      {
        "id": "BLOG-224458326524",
        "logNo": "224458326524",
        "section": "column",
        "title": "확 트인 낙동강 뻥뷰! 1억 7천만 원대 가성비 최고 아파트 매매",
        "category": "■ 추천매물",
        "date": "2026.10.29",
        "timestamp": 1793281845000,
        "pubDate": "Thu, 29 Oct 2026 22:50:45 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjlfMTI3/MDAxNzkzMjgxODMwODI0._hYzT4IaJcGxYoo4wWJgNe0VyklPgGN_7gmlftxUUswg.hUToZNvLW8QbUoKUfngzwoHbRqyuArDdlyr5geF7vK8g.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%B4%F6%C6%F7%C3%BB%B1%B8_104%B5%BF_%C5%BE%C3%FE_%B8%C5%B8%C5_1%BE%EF72%B9%E9%B8%B8%BF%F8.png?type=w800",
        "excerpt": "1부 황금터잡이 신소장과 함께하는 동선별 랜선 집들이 안녕하세요! 사상구 덕포동의 든든한 주거 전문 컨설턴트, 황금터잡이 신소장입니다. 오늘은 덕포동에 위치한 덕포청구 아파트 104동의 아주 특별한 탑층 매물을 소개해 드릴게요. 사진으로 먼저 둘러보시...",
        "tags": [
          "#덕포동아파트매매",
          "#덕포청구아파트",
          "#사상구아파트",
          "#탑층아파트"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224458326524",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224456954842",
        "logNo": "224456954842",
        "section": "column",
        "title": "4층이지만 7층 높이! 분수대와 예쁜 단지 정원이 한눈에 담기는 남향 뷰 맛집",
        "category": "■ 추천매물",
        "date": "2026.10.28",
        "timestamp": 1793182059000,
        "pubDate": "Wed, 28 Oct 2026 19:07:39 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjhfMjI3/MDAxNzkzMTgwNjI4ODMz.O3X5sFGLzl-nvFToAbAfL5WpyE3Tb8RUu_Ax9wp7ay0g.IIPv7_O9zXSWva19L_FIIG1ZlB6JEsDmOId5_Fzalykg.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_6%BE%EF2%C3%B5.png?type=w800",
        "excerpt": "안녕하세요, 이웃 여러분! 부산 사상구에서 여러분의 따뜻하고 편안한 보금자리를 찾아드리는 주거 전문 컨설턴트, '황금터잡이 신소장'입니다. 오늘은 사상구의 대장주 신축 단지죠, 사상중흥S-클래스 그랜드센트럴(총 1,572세대)에서 정말 귀하고 특별한 ...",
        "tags": [
          "#사상아파트매매",
          "#덕포동아파트매매",
          "#사상중흥아파트",
          "#중흥s클래스",
          "#황금터잡이"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224456954842",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224452416147",
        "logNo": "224452416147",
        "section": "column",
        "title": "[사상중흥 탑층] 113동 121세대 33층 중에  단 2세대뿐인 귀한 탑층! 층간소음 0%",
        "category": "■ 추천매물",
        "date": "2026.10.24",
        "timestamp": 1792835262000,
        "pubDate": "Sat, 24 Oct 2026 18:47:42 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjRfNDQg/MDAxNzkyODMzNDEzNDgy.XEHaUhEIAdRKhrCcjkP8lO9dXHdbAQw7E1lg-bLTFc0g.mqqdDP-aHdWtW-LQin67P9ZslKE0pdf92s-09_Orgz8g.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_6%BE%EF8%C3%B5_%281%29.png?type=w800",
        "excerpt": "사상구 덕포동의 랜드마크, 사상중흥S-클래스그랜드센트럴 113동 최고층 탑층 매물 랜선 집들이를 시작합니다. 문을 여는 순간부터 \"아, 이 집에서 살고 싶다!\"는 감탄이 절로 나오는 매력적인 공간이랍니다. 저 신소장과 함께 천천히 둘러보실까요? 집의 ...",
        "tags": [
          "#사상아파트",
          "#덕포아파트",
          "#사상중흥s",
          "#사상구아파트매매",
          "#사상참좋은부동산"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224452416147",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224450661854",
        "logNo": "224450661854",
        "section": "column",
        "title": "[로얄동/조경뷰] 거실 소파에서 내 집 앞마당 같은 정원 뷰를 누리는 3층 꿀매물!",
        "category": "■ 추천매물",
        "date": "2026.10.22",
        "timestamp": 1792678661000,
        "pubDate": "Thu, 22 Oct 2026 23:17:41 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjJfMTA5/MDAxNzkyNjc3MjYyOTI0.mquOYioAtjirs1EwgWqeAdQyOXfrmFUzHW73J2KvGUcg.c97LhbgHmG8amhHUN4qaUwd0S4PEvBk47ESLkSVgqtog.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_6%BE%EF2%C3%B5.png?type=w800",
        "excerpt": "안녕하세요! 부산 사상구 덕포동 참좋은부동산 '황금터잡이 신소장'입니다. 오늘은 집주인분이 거주하시면서 좋은 기운을 듬뿍 받아, \"이 집 구조가 너무 좋아서 똑같은 구조의 더 넓은 평수\"로 기분 좋게 갈아타기를 하시는 '행운이 가득한 찐 알짜 매물'을...",
        "tags": [
          "#사상중흥S클래스그랜드센트럴",
          "#시싱중흥아파트매매",
          "#덕포동아파트",
          "#사상구아파트매매"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224450661854",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224448195780",
        "logNo": "224448195780",
        "section": "column",
        "title": "복잡한 LH 전세임대 종결판! SH 비교부터 단독·다가구 권리분석 실무 비책까지",
        "category": "기타정보",
        "date": "2026.10.20",
        "timestamp": 1792499929000,
        "pubDate": "Tue, 20 Oct 2026 21:38:49 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjBfMTgy/MDAxNzkyNDk2NzEzNTA1.OujpoKCPaLQdelFq-HurM7SDfae871H-WNmOBAU-XXEg.eUEeMPByPIWV9WHokmyK0aRjb99V7gtdExzxAsTUDCMg.PNG/Gemini_Generated_Image_vr38z4vr38z4vr38.png?type=w800",
        "excerpt": "안녕하세요! 사상구 1층 모퉁이에서 따뜻한 보금자리와 든든한 상가를 책임지는 주거 컨설턴트, 황금터잡이 신소장(신제환)입니다. 최근 전세사기 여파와 보증보험(HUG) 가입 기준 강화로 은행 전세대출이나 전세 맞추기가 만만치 않으실 겁니다. 이럴 때 임...",
        "tags": [
          "#LH전세임대",
          "#LH권리분석",
          "#다가구주택",
          "#선순위채권"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224448195780",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224446898959",
        "logNo": "224446898959",
        "section": "column",
        "title": "선호도 1위 4Bay 판상형 구조로 모든 방과 거실에서 오전에는 낙동강 리버뷰, 저녁에는 환상적인 도심 야경을 영구 조망!",
        "category": "■ 추천매물",
        "date": "2026.10.19",
        "timestamp": 1792406845000,
        "pubDate": "Mon, 19 Oct 2026 19:47:25 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjZfMjM1/MDAxNzkzMDExOTg2Nzgy.mX2sZAqvHBRr580nHwS8ZbJN5_au7saf0tJ2Z5l8Wusg.3huOVe8vZz7nyahlnJRBdMIJGcCvWlysexVNaIV1KI0g.PNG/1-1%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_6%BE%EF6%C3%B5.png?type=w800",
        "excerpt": "안녕하세요! 사상구 아파트를 가장 잘 아는 여러분의 든든한 주거 파트너, 황금터잡이 신소장입니다. 오늘은 사상구의 대장주 신축 아파트죠! 사상 중흥S-클래스 그랜드센트럴에서도 정말 귀하디귀한 110동 38층(탑층) 79㎡(구 32평형) 매물을 소개해 ...",
        "tags": [
          "#사상중흥S클래스그랜드센트럴",
          "#덕포동중흥S클래스",
          "#부산낙동강뷰아파트",
          "#사상중흥아파트",
          "#황금터잡이신소장"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224446898959",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224445679762",
        "logNo": "224445679762",
        "section": "column",
        "title": "[급매] 사상중흥S-클래스 그랜드센트럴 112동 33평형 ! 지하철·도서관 3분 거리, 뷰 맛집 로얄동으로 초대합니다",
        "category": "■ 추천매물",
        "date": "2026.10.18",
        "timestamp": 1792315294000,
        "pubDate": "Sun, 18 Oct 2026 18:21:34 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjZfMTU4/MDAxNzkzMDA5MDc1NTI1.fmLHJYtDbbMoUQlqUA7YigeAEFrWqfjfqB5DwOjEa5gg.HbZezlYMrw_FYmH54A0nref4TUeCzVoqR7qqPDbaydUg.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_5%BE%EF7%C3%B5.png?type=w800",
        "excerpt": "안녕하세요! 사상구의 편안하고 따뜻한 보금자리를 찾아드리는 여러분의 주거 전문 컨설턴트, 참좋은 공인중개사사무소 '황금터잡이 신소장'입니다. 오늘은 사상구 덕포동의 자랑이자 1,572세대 매머드급 신축 대단지인 '사상중흥S-클래스 그랜드센트럴' 중에서...",
        "tags": [
          "#사상중흥S클래스그랜드센트럴",
          "#사상중흥S클래스",
          "#사상아파트급매",
          "#사상중흥s클래스아파트급매"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224445679762",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224444038686",
        "logNo": "224444038686",
        "section": "column",
        "title": "[로얄층 파노라마 뻥뷰] 105동 25층 고층 세대로 거실과 방마다 막힘없는 마운틴·시티뷰와 일조량 최고!",
        "category": "■ 추천매물",
        "date": "2026.10.16",
        "timestamp": 1792147606000,
        "pubDate": "Fri, 16 Oct 2026 19:46:46 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMTZfMiAg/MDAxNzkyMTQyMTk1ODk4.mq22OD3G-jX2Sf_cjED5E27zRekhIPB11zrbGwpHfuAg.9RVjtVAU0hu8nIELgG5mbV9WAoVqSAKMUcs61YLJKmwg.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BB%E7%BB%F3_%C1%DF%C8%EFS-%C5%AC%B7%A1%BD%BA_%B8%C5%B8%C5_6%BE%EF2%C3%B5_%281%29.png?type=w800",
        "excerpt": "안녕하세요! 사상구 아파트 단지 1층 코너에서 여러분의 따뜻하고 편안한 보금자리를 찾아드리는 주거 전문 컨설턴트 '황금터잡이 신소장(참좋은 공인중개사사무소)'입니다. 오늘 소개해 드릴 곳은 사상구 덕포동의 대장주 브랜드 대단지, 사상중흥S-클래스그랜드...",
        "tags": [
          "#사상중흥S클래스그랜드센트럴",
          "#사상중흥S클래스",
          "#사상구아파트매매",
          "#덕포동아파트"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224444038686",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224443605792",
        "logNo": "224443605792",
        "section": "column",
        "title": "상가 권리금 주고 인수할 때, 영업 보장 기간 10년이 다시 시작될까요? (양수도 계약 주의사항)",
        "category": "상가관련",
        "date": "2026.10.16",
        "timestamp": 1792121725000,
        "pubDate": "Fri, 16 Oct 2026 12:35:25 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMTZfNTgg/MDAxNzkyMTE5OTkyMjc4.NIDp25lFv74N4_6G2BOsR_tOhuKj2wG8mpnAi1rrm5Qg.CoiD_a3zZVKD3p-CIdEKlaeOp0T1nNk6e2C1dYRcBikg.PNG/Gemini_Generated_Image_nql9xknql9xknql9.png?type=w800",
        "excerpt": "안녕하세요, 여러분의 성공적인 비즈니스 파트너 황금터잡이 신소장입니다. 상가 중개 현장에서 권리금 양수도 계약을 진행하다 보면, 가게를 인수하시는 사장님(양수인)들께서 가장 먼저, 그리고 가장 불안해하며 물어보시는 질문이 있습니다. \"소장님, 제가 권...",
        "tags": [
          "#상가권리금계약",
          "#상가양수도계약",
          "#계약갱신요구권",
          "#권리금회수기회보호",
          "#10년초과상가권리금"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224443605792",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224440466912",
        "logNo": "224440466912",
        "section": "column",
        "title": "주택 vs 상가 임차갱신권 완벽 정리 (ft. 묵시적 갱신 차이,  최신 대법원 판례 설명)",
        "category": "주택관련",
        "date": "2026.10.13",
        "timestamp": 1791880696000,
        "pubDate": "Tue, 13 Oct 2026 17:38:16 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMTNfMTMg/MDAxNzkxODgwODkwMTk3.d5H1msMtfhOHoyF7RSdVxy2I3NGo3gS9UjUWY9mhwnog.ObZQw-1JrU57quSRgf3j3AE5mw_XZYN2uCUpQDGVn0sg.PNG/Gemini_Generated_Image_qlqyhpqlqyhpqlqy.png?type=w800",
        "excerpt": "안녕하세요! 사상구 덕포동 늘 여러분과 함께하는 참좋은 공인중개사사무소, '황금터잡이 신소장입니다. 상가와 주택을 오가며 중개를 하다 보면, 임대인과 임차인 모두에게 가장 예민하고 질문이 많은 주제가 바로 '임차갱신권(계약갱신요구권)'입니다. 내 삶의...",
        "tags": [
          "#계약갱신청구권",
          "#임차인있는집매매",
          "#세끼고매매",
          "#실거주갱신거절"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224440466912",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224435278374",
        "logNo": "224435278374",
        "section": "column",
        "title": "노래방, 단란주점, 유흥주점 차이점 완벽 정리 & 인허가 필수 체크리스트! (ft. 부산 상가 상권분석)",
        "category": "상가관련",
        "date": "2026.10.08",
        "timestamp": 1791439527000,
        "pubDate": "Thu, 08 Oct 2026 15:05:27 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMDhfOTIg/MDAxNzkxNDM1MzY4Mjk0.gqmNnFkFNNL3PwXCPIrHHB8c4WKSbfvngMd8VupeTqkg.swKHV-LjK3yR007NgYzj5k9JNytGUqs73GW0Nz7u2aog.PNG/Gemini_Generated_Image_6umpf86umpf86ump.png?type=w800",
        "excerpt": "안녕하세요! 여러분의 든든한 상가 비즈니스 파트너, 황금터잡이 신소장입니다. 상가 중개 현장에서 고객님들과 상담을 하다 보면, \"사장님, 여기 상가에 노래방 하나 차리려고 하는데 단란주점 허가 날까요?\" 라는 질문을 자주 받습니다. 노래연습장, 단란주...",
        "tags": [
          "#노래연습장창업",
          "#단란주점창업",
          "#유흥주점창업",
          "#사상구상가창업",
          "#노래연습장인허가사항"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224435278374",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224427503920",
        "logNo": "224427503920",
        "section": "column",
        "title": "식당 상가 양도양수 전 필수 확인! 소방필증 승계와 권리금 보호 가이드",
        "category": "상가관련",
        "date": "2026.09.30",
        "timestamp": 1790771488000,
        "pubDate": "Wed, 30 Sep 2026 21:31:28 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA5MzBfMzEg/MDAxNzkwNzY5NDMyNDg5.7udc8gIR_3cGP12_oZ7CVI7CPCWb1cu8f6tBMeqLvXog.ID6kkyPoKq2dXjiNxn2C3vU-2DOhETDQ7e-rdSymga4g.PNG/Gemini_Generated_Image_hzu6ahhzu6ahhzu6.png?type=w800",
        "excerpt": "상가 계약의 숨은 지뢰, '소방' 상가 양도양수 계약을 체결하고, 권리금과 보증금까지 모두 지급했는데 정작 관할 구청에서 '영업신고증'이 나오지 않아 오픈을 못 하는 경우가 있습니다. 가장 대표적인 원인이 바로 '소방필증(안전시설등 완비증명서)' 문제...",
        "tags": [
          "#소방필증승계",
          "#영업신고증승계",
          "#상가인테리어소방",
          "#상가계약주의사항",
          "#소방필증필수대상업종"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224427503920",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224422568774",
        "logNo": "224422568774",
        "section": "column",
        "title": "부산진구 부암동 시민공원삼정그린코아더베스트 33평 매매 | 부암초품아·시민공원 도보권 남향 착한가격 추천",
        "category": "아파트",
        "date": "2026.09.25",
        "timestamp": 1790328654000,
        "pubDate": "Fri, 25 Sep 2026 18:30:54 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjEwMjdfNDIg/MDAxNzkzMDgyNjE2ODMw.85Ta07_aXbCXz2UXH9f1WSSMTNqn9WQOTh-YMElj5nYg.slDBtX3-uNkpu8WpFVWkj2FHyalFYq0JNImClxaEypUg.PNG/%BA%CE%B5%BF%BB%EA%BD%E6%B3%D7%C0%CF_%BD%C3%B9%CE%B0%F8%BF%F8_%BB%EF%C1%A4%B1%D7%B8%B0%C4%DA%BE%C6_%B8%C5%B8%C5_4%BE%EF8%C3%B5.png?type=w800",
        "excerpt": "안녕하세요! 신뢰와 정성으로 고객님의 소중한 보금자리와 성공적인 부동산을 함께하는 참좋은 공인중개사 사무소입니다. 오늘 소개해드릴 특별한 매물은 부산의 중심 부산진구 부암동에 위치한 시민공원삼정그린코아더베스트(주상복합) 전용 84㎡(공급 33평형) 매...",
        "tags": [
          "#부산시민공원",
          "#삼정그린코아더베스트",
          "#삼정그린코아더베스트33평",
          "#삼정그린코아매매"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224422568774",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224411354836",
        "logNo": "224411354836",
        "section": "column",
        "title": "부린이 필수 상식! 전용면적 vs 공급면적 vs 계약면적, 3분 만에 이해하기",
        "category": "■ 정보게시판",
        "date": "2026.09.14",
        "timestamp": 1789369605000,
        "pubDate": "Mon, 14 Sep 2026 16:06:45 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA5MTRfMTIz/MDAxNzg5MzY5NDg5NTAz.aPJnCZuYpeI_7MnxtZIowCDIBtN3mGNJDfAiGx78bpUg.lHRt_01ckgYTvQHS_7IX5R45Hs-KvGDrusWNW5EiR68g.PNG/34평.png?type=w800",
        "excerpt": "\"소장님, 청약 공고문에는 84㎡라고 되어 있는데, 왜 다들 34평 아파트라고 부르는 거예요?\" 안녕하세요! 현장에서 손님들과 아파트를 보러 다니다 보면 정말 하루에 한 번씩은 꼭 듣게 되는 단골 질문입니다. 아파트 모델하우스를 가거나 부동산 어플을 ...",
        "tags": [
          "#아파트면적",
          "#전용면적",
          "#공용면적",
          "#계약면적",
          "#전용율"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224411354836",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224408527081",
        "logNo": "224408527081",
        "section": "column",
        "title": "[부동산 실무] 전월세 신고제(주택임대차계약 신고제) 총정리! 대상, 방법, 과태료까지 완벽 가이드",
        "category": "주택관련",
        "date": "2026.09.13",
        "timestamp": 1789270800000,
        "pubDate": "Sun, 13 Sep 2026 12:40:00 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA5MTFfMTE3/MDAxNzg5MTE1MTM2ODkx.RrijyK1AFoYC89waCAUwLV6L8oCIYyOGY0JZ0KASKNog.jab5I4JMcfrtp_AqUA96BrKekKNvHKPcXePNNYQHdx8g.PNG/Gemini_Generated_Image_u1dbovu1dbovu1db.png?type=w800",
        "excerpt": "안녕하세요! 현장에서 발로 뛰며 고객님의 소중한 자산을 안전하게 연결해 드리는 황금터잡이 신소장입니다. 임대차 계약을 진행하다 보면 임대인 분들도, 임차인 분들도 가장 많이 질문하시는 내용 중 하나가 바로 '주택임대차계약 신고제(전월세 신고제)'입니다...",
        "tags": [
          "#주택임대차신고제",
          "#전월세신고제",
          "#주택임대차신고대상",
          "#부산임대차신고"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224408527081",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224408279136",
        "logNo": "224408279136",
        "section": "column",
        "title": "다가구/법인 계약, 선���위 임차인 현황 대충 적었다간 손해배상 폭탄?",
        "category": "주택관련",
        "date": "2026.09.12",
        "timestamp": 1789182600000,
        "pubDate": "Sat, 12 Sep 2026 12:10:00 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA5MTFfMjk4/MDAxNzg5MTAyOTgwMzk1.21WXtrQ7V5gxAWlm0FuN_j-5Lizsob-nY7AbTnSAz4Ig.uhcaiKUfx8GfVQRHoeihEmwI-WuiCKNj2Q7sth0jddQg.PNG/Gemini_Generated_Image_f2p420f2p420f2p4.png?type=w800",
        "excerpt": "안녕하세요! 늘 정확하고 꼼꼼한 권리분석으로 안심을 드리는 여러분의 든든한 부동산 파트너, 황금터잡이신소장입니다. 부동산 실무 현장에서 법인 대표님들이나 다가구주택 임대인분들과 계약을 진행하다 보면 종종 이런 난감한 상황을 마주하게 됩니다. \"아휴, ...",
        "tags": [
          "#전입세대확인서",
          "#확정일자부여현황",
          "#다가구계약",
          "#법인계약"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224408279136",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224408180316",
        "logNo": "224408180316",
        "section": "column",
        "title": "법인이 임대인 경우, 이것 모르면 보증금 날립니다!",
        "category": "주택관련",
        "date": "2026.09.11",
        "timestamp": 1789097422000,
        "pubDate": "Fri, 11 Sep 2026 12:30:22 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA5MTFfMjQ1/MDAxNzg5MDk3MzExNjk0.H3KLPytI9JdEuuvGGYte4CYugO_fvxGGWqLFDmqNotEg.VNM3YJ1xnj-evRWfI6PyfVnxbYoy4l6hdp44o3aqGiwg.PNG/Gemini_Generated_Image_g8c8tlg8c8tlg8c8.png?type=w800",
        "excerpt": "안녕하세요! 부동산 법률과 현장 실무를 명쾌하게 전해드리는 황금터잡이 신소장입니다. 마음에 쏙 드는 집을 찾았는데, 집주인이 개인 성함이 아니라 '○○주식회사' 같은 법인으로 되어 있어서 선뜻 계약하기 망설여지신 적 있으신가요? \"법인하고 계약해도 내...",
        "tags": [
          "#법인임대인계약",
          "#법인임대차서류",
          "#중개사고예방",
          "#법인임대인계약시주의사항"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224408180316",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224368079641",
        "logNo": "224368079641",
        "section": "column",
        "title": "횟집 영업양수도 계약! (특약사항, 필요서류 총정리)",
        "category": "상가관련",
        "date": "2026.08.04",
        "timestamp": 1785837101000,
        "pubDate": "Tue, 04 Aug 2026 18:51:41 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA4MDRfMTcw/MDAxNzg1ODM3MDgwOTM5.EgK9T8n1tqZ-ChIbR4leFkjbn02slRi4koSULRKpaYog.M_9EGjhCEcs070zPlruQAKxcEJyQ0bD7XfoXCC9dBqUg.PNG/Gemini_Generated_Image_9yjwb89yjwb89yjw.png?type=w800",
        "excerpt": "안녕하세요! 여러분의 안전하고 확실한 중개를 돕는 황금터잡이 신소장입니다. 상가 중개를 하다 보면 일반 음식점보다 훨씬 까다롭고 신경 쓸 게 많은 업종이 있습니다. 바로 '횟집'인데요. 대형 수족관, 해수(소금물) 사용, 많은 물 사용량 때문에 계약 ...",
        "tags": [
          "#횟집중개",
          "#횟집영업양수도",
          "#횟집영업양수도시주의사항",
          "#영업양수도특약",
          "#영업양수도계약서"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224368079641",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224361375888",
        "logNo": "224361375888",
        "section": "column",
        "title": "위반건축물 양성화 기회! '특정건축물 정리에 관한 특별조치법' 핵심 완벽 정리",
        "category": "기타정보",
        "date": "2026.07.29",
        "timestamp": 1785284918000,
        "pubDate": "Wed, 29 Jul 2026 09:28:38 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA3MjlfMTEz/MDAxNzg1Mjg0OTAyNjAw.0sM-FBgdlw_xIKv_ClP6Y7NdRN41TLyiyAh092wdjXsg.jt-vWu0TEs_mg9LWtsloArNwmxDoWb_9Us9hgY5-Eg0g.PNG/Gemini_Generated_Image_4r49mk4r49mk4r49.png?type=w800",
        "excerpt": "집이나 상가를 매수할 때, 혹은 살다 보니 알게 된 위반건축물(불법건축물) 문제로 골치 아프셨던 분들 많으시죠? 이행강제금 부담과 재산권 행사 제약으로 걱정이 크셨을 텐데요. 드디어 불법건축물을 양성화하여 합법적으로 사용승인을 받을 수 있는 ‘특정건축...",
        "tags": [
          "#특정건축물정리에관한특별조치법",
          "#불법건축물",
          "#위반건축물",
          "#법건축물양성화"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224361375888",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224353086495",
        "logNo": "224353086495",
        "section": "column",
        "title": "빈 상가인데 건축물대장에 '위반건축물'? 절대 계약하면 안 될까요? (일반음식점 영업승계 완벽 정리)",
        "category": "상가관련",
        "date": "2026.07.21",
        "timestamp": 1784605707000,
        "pubDate": "Tue, 21 Jul 2026 12:48:27 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA3MjFfMTg4/MDAxNzg0NjA0ODc5NDc2.iupevHr8AaaBTAW_NMZU8toCCTP2yHUbLls-TGiuPG0g.s3y6-olXXVUpHGYWOPwNh-mDNp8Bu0GTbX_U6ch6B28g.PNG/그림1.png?type=w800",
        "excerpt": "안녕하세요! 상가와 주택 임대차·매매를 전문으�� 전해드리는 사상 참좋은 부동산 \"황금터잡이 신소장\"입니다. 상가 창업을 준비하시며 마음에 쏙 드는 빈 점포를 발견했는데, 계약 전 건축물대장을 열어보니 노란색 글씨로 '위반건축물'이라는 딱지가 붙어 있...",
        "tags": [
          "#위반건축물",
          "#위반건축물영업승계",
          "#일반음식점지위승계"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224353086495",
        "sourceId": "toomany22"
      },
      {
        "id": "BLOG-224346247074",
        "logNo": "224346247074",
        "section": "column",
        "title": "'상가 계약 전 필수 확인! 헷갈리는 업종 분류 완벽 가이드'",
        "category": "상가관련",
        "date": "2026.07.14",
        "timestamp": 1784005691000,
        "pubDate": "Tue, 14 Jul 2026 14:08:11 +0900",
        "thumbnail": "https://blogthumb.pstatic.net/MjAyNjA3MTRfODUg/MDAxNzg0MDA1NDc5MjE4.TsavUh2wenRYIZ5z204TYy0ZFqO5NWYO8OJoJBCPeQIg.FW_y3cRFGv3QL1g9YXfxtcY77WDyqzUiKWjLKTj-Ddgg.PNG/그림1.png?type=w800",
        "excerpt": "안녕하세요! 상가와 주택의 알짜배기 부동산 정보를 알기 쉽게 전해드리는 사상 참좋은 부동산의 \"황금터잡이 신소장\"입니다. 상가 계약을 앞둔 예비 창업자분들이나 상가 투자를 준비하시는 분들이 가장 많이 헷갈려하시는 질문이 하나 있습니다. *\"카페를 차리...",
        "tags": [
          "#헷갈리는업종분류코드",
          "#상가업소업종분류",
          "#한국표준산업분류"
        ],
        "author": "황금터잡이 신제환 대표",
        "agentPhone": "010-9667-4201",
        "authorRole": "대표 공인중개사",
        "link": "https://blog.naver.com/toomany22/224346247074",
        "sourceId": "toomany22"
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
