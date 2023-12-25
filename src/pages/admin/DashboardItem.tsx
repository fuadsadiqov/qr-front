import { useEffect, useState } from "react";
import { environment } from "../../environment/environment.prod";
import { DASHBOARD_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods } from "../../interfaces/method";
import BarChart from "../../components/BarChart";
import { CircularProgress } from "@mui/material";

export default function DashboardItem() {
  const [ratingData, setRatingData] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    fetch(
      environment.apiUrl + DASHBOARD_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const newRatingData = data.message.map((rating: any) =>
            parseFloat(rating.averageRating).toFixed(3)
          );
          const newCategories = data.message.map(
            (rating: any) => rating.teamName
          );
          setRatingData(newRatingData);
          setCategories(newCategories);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        if (ratingData.length === 0) {
          setIsEmpty(true);
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-medium">Average rating for teams</span>
      {!isEmpty ? (
        <div>
          {ratingData.length ? (
            <BarChart data={ratingData} labels={categories} />
          ) : (
            <div className="flex justify-center">
              <CircularProgress color="info" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full text-center">There is no rating yet.</div>
      )}
    </div>
  );
}
