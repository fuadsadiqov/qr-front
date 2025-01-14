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
        if (data) {
          const newRatingData = data.map((rating: any) =>rating.data);
          const newCategories = data.map((rating: any) =>rating.label);
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
        } else {
          setIsEmpty(false);
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-medium">Average rating for teams</span>

      {ratingData.length ? (
        <BarChart data={ratingData} labels={categories} />
      ) : (
        <div className="flex justify-center">
          {!isEmpty ? (
            <CircularProgress color="info" />
          ) : (
            <div>There is no rating yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
