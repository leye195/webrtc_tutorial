# WAVA (WebRTC Studying)

- [x] React (TypeScript), styled-components
- [x] Socket.io
- [x] Express
- [x] WebRTC (Peer)
- [x] Node.js

## ToDo

- [x] WebRTC를 활용해 간단한 화상통화를 구현
- [x] 서버 연결 jwt토큰 방식 로그인 구현
- [x] 영상 회의 참가,개설

## WebRTC

### 특징

- WebRTC는 서버를 통하지 않고 웹 어플리케이션(최근에는 android 및 ios도 지원) 및 사이트들 즉, 클라이언트와 클라이언트가 별도의 소프트웨어 없이 음성, 영상 미디어 혹은 텍스트, 파일 같은 데이터를 브라우저끼리 주고 받을 수 있게 만든 기술이다(Peer to Peer).
- 어떤 플러그인 없이 음성채팅은 물론이며 화상채팅, 데이터 교환까지도 가능, 하지만 일부 브라우저에서는 지원하지 않음
- 안정성이 좋은 TCP가 아닌 속도가 빠른 UDP를 사용,
- 현재 표준 프로토콜이 없다고 한다.

### 용어 정리

#### NAT

- 외부망과 분리하고 공인망과 내부망의 IP:Port를 매핑해주는 것

#### Stun Server, Turn Server

1. Stun(Session Traversal Utilities for NAT):

- 네트워크 프로토콜/패킷 포맷으로, 네트워크 환경에 대한 Discovery? 를 위한 것으로메신저들 끼리 통신하기 위해 STUN패킷을 이용한다. STUN은 IP 종단을 연결하기 위해 2가지를 일을 해주는데<br/>
- (1) 어떤 종단이 NAT/방화벽 뒤에 있는지 판단<br/>
- (2) 어떤 종단에 대한 공인IP 주소를 결정하고 NAT/방화벽의 유형을 알려준다. <br/>
- (2)번의 정보를 가지고 P2P IP를 연결하기 위한 정보를 제공하며 STUN은 P2P IP연결을 위한 정보를 제공해주기만 한다.<br/>
- 만약 어떤 종단의 환경이 P2P IP 연결이 불가능할 경우 STUN이 아닌 TURN을 활용해야 한다.<br/>
- public 관점에서는 종단에 access 가능한 ip:port를 발견하는 작업암

2. TURN(Traversal Using Relays around NAT)

- Peer간 직접 통신이 실패할 경우 종단점들 사이에 데이터를 릴레이를 수행하는<br/>
- TURN 서버들을 사용하는데, TURN은 Peer들간의 미디어 스트리밍을 릴레이 하기 위해 사용<br/>
- TURN은 공용 주소들을 가지고 있으며 미디어를 릴레이 하기 때문에 네트워크와 컴퓨팅 자원 소모될수 있다.<br/>

#### SDP(Session Description Protocol)

- 연결하고자 하는 Peer 서로간의 미디어와 네트워크에 관한 정보를 서로 교환하고 이해하기 위해 사용됨

#### ICE (Interactive Connectivity Establishment)

클라이언트의 모든 통신 가능 주소를 식별해준다.<br/>
식별을 하기 위헤 3가지를 활용한다<br/>

- local Address: 클라이언트의 사설주소(host candidate), 랜과 무선랜 등 다수 인터페이스가 있으면 모든 주소가 후보가 됨
- server Reflexive Address: NAT 장비가 매핑한 클라이언트 공인망 주소로 STUN에 의해 판단됨
- Relayed Address: TURN서버가 패킷 릴레이를 위해 할당하는 주소

## [참고하기]

- https://youtube.com/watch?v=DvlyzDZDEq4&t=426s
- https://peerjs.com/docs.html#peeron-close
- https://github.com/peers/peerjs-server
- https://github.com/jmcker/Peer-to-Peer-Cue-System
- https://velog.io/@ehdrms2034/WebRTC-%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%A1%9C-%ED%99%94%EC%83%81-%EC%B1%84%ED%8C%85%EC%9D%84-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0
- https://alnova2.tistory.com/1110
- https://www.youtube.com/watch?v=2Z2PDsqgJP8
