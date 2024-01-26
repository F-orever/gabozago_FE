export interface DayPlan {
  day: number;
  date: Date;
  dayOfWeek: string;
  route: Place[];
}
export interface Place {
  placeName: string;
  theme: string;
  placeId: number;
  position: { lat: number; lng: number };
  placeImage: string;
  memo: string;
  transfort: string;
  travelTime: string;
}
export const data = {
  title: "즐거운 부산 여행",
  departureDate: new Date("2024-12-20"), // 출발
  arrivalDate: new Date("2024-12-23"), // 도착
  days: 4,
  transport: "대중교통",
  plan: [
    {
      day: 1,
      date: new Date("2024-12-20"),
      dayOfWeek: "수",
      route: [
        {
          placeName: "더베이베이커리",
          theme: "베이커리",
          placeId: 1232132131,
          position: { lat: 37.1234, lng: -122.5678 },
          placeImage:
            "https://placehold.co/300x300/738DEC/white?text=go&font=roboto",
          memo: "",
          transfort: "",
          travelTime: "",
        },
        {
          placeName: "장소명",
          theme: "테마",
          placeId: 1232132131,
          position: { lat: 37.1234, lng: -122.5678 },
          placeImage:
            "https://placehold.co/300x300/738DEC/white?text=go&font=roboto",
          memo: "",
          transfort: "",
          travelTime: "15분",
        },
      ],
    },
    {
      day: 2,
      date: new Date("2024-12-21"),
      dayOfWeek: "목",
      route: [],
    },
    {
      day: 3,
      date: new Date("2024-12-22"),
      dayOfWeek: "목",
      route: [],
    },
    {
      day: 4,
      date: new Date("2024-12-23"),
      dayOfWeek: "토",
      route: [],
    },
  ],
};