// "use client";
// import Wrapper from "@components/helpers/wrapper";
// import Link from "next/link";
// import { useSelector } from "react-redux";

// const Home = () => {
//   const auth = useSelector((state) => state.persistedReducer.auth.value);
//   console.log("auth", auth);

//   return (
//     <div>
//       {(auth.isSuperAdmin || auth.isAdmin) && (
//         <Wrapper>
//           <div className="w-100">
//             <Link href={"/product"}>Products</Link>
//           </div>
//           <div className="w-100">
//             <Link href={"/module"}>Modules</Link>
//           </div>
//           <div className="w-100">
//             <Link href={"/user"}>Users</Link>
//           </div>
//           <div className="w-100">
//             <Link href={"/category"}>Category</Link>
//           </div>
//           <div className="w-100">
//             <Link href={"/salesstage"}>Sales Stage</Link>
//           </div>
//           <div className="w-100">
//             <Link href={"/currencyconversionrates"}>Currency Conversion Rates</Link>
//           </div>
//         </Wrapper>
//       )}
//       <div className="w-100">
//         <Link href={"/lead"}>Leads</Link>
//       </div>
//     </div>
//   );
// };
// export default Home;

"use client";
import DonutChart from "@components/charts/donutChart";
import FunnelChart from "@components/charts/funnelChart";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { numberFormatter } from "@lib/utils";
import { useEffect } from "react";

const Home = () => {
  const metricCardsAPI = useApi();
  const leadSalesStageAPI = useApi();
  const leadershipInfluenceStageAPI = useApi();
  const partnerInfluenceAPI = useApi();
  const categoryDistributionAPI = useApi();
  const countryDistributionAPI = useApi();
  const usersWiseLeadDistributionAPI = useApi();

  // METRIC CARDS
  useEffect(() => {
    metricCardsAPI.fetchData("summary/metric-cards");
  }, []);

  let metricCards = "Loading...";

  if (metricCardsAPI.apiStatus.isLoading) {
    metricCards = "Loading...";
  }

  if (metricCardsAPI.apiStatus.error) {
    metricCards = "Something went wrong!";
  }

  if (!metricCardsAPI.apiStatus.isLoading && metricCardsAPI.apiStatus.isLoaded) {
    if (metricCardsAPI.data === null || metricCardsAPI.data.data === undefined || metricCardsAPI.data.data === null || metricCardsAPI.data.data.length === 0) {
      metricCards = "No data available";
    } else {
      metricCards = metricCardsAPI.data.data.map((metric, metricIndex) => (
        <div key={metricIndex} class="card">
          <div class="value">{numberFormatter(metric.value)}</div>
          <div class="label">{metric.label}</div>
        </div>
      ));
    }
  }

  // LEAD SALES STAGE
  useEffect(() => {
    leadSalesStageAPI.fetchData("summary/lead-stage-sales");
  }, []);

  let leadSalesStage = "Loading...";

  if (leadSalesStageAPI.apiStatus.isLoading) {
    leadSalesStage = "Loading...";
  }

  if (leadSalesStageAPI.apiStatus.error) {
    leadSalesStage = "Something went wrong!";
  }

  if (!leadSalesStageAPI.apiStatus.isLoading && leadSalesStageAPI.apiStatus.isLoaded) {
    if (leadSalesStageAPI.data === null || leadSalesStageAPI.data.data === undefined || leadSalesStageAPI.data.data === null || leadSalesStageAPI.data.data.length === 0) {
      leadSalesStage = "No data available";
    } else {
      leadSalesStage = (
        <Wrapper>
          <FunnelChart chartId={"leadSalesStage"} chartData={leadSalesStageAPI.data.data} />
        </Wrapper>
      );
    }
  }

  // LEADERSHIP INFLUENCE
  useEffect(() => {
    leadershipInfluenceStageAPI.fetchData("summary/leadership-influence");
  }, []);

  let leadershipInfluence = "Loading...";

  if (leadershipInfluenceStageAPI.apiStatus.isLoading) {
    leadershipInfluence = "Loading...";
  }

  if (leadershipInfluenceStageAPI.apiStatus.error) {
    leadershipInfluence = "Something went wrong!";
  }

  if (!leadershipInfluenceStageAPI.apiStatus.isLoading && leadershipInfluenceStageAPI.apiStatus.isLoaded) {
    if (leadershipInfluenceStageAPI.data === null || leadershipInfluenceStageAPI.data.data === undefined || leadershipInfluenceStageAPI.data.data === null || leadershipInfluenceStageAPI.data.data.length === 0) {
      leadershipInfluence = "No data available";
    } else {
      leadershipInfluence = (
        <Wrapper>
          <DonutChart chartId={"leadershipInfluence"} chartData={leadershipInfluenceStageAPI.data.data} />
        </Wrapper>
      );
    }
  }

  // PARTNER INFLUENCE
  useEffect(() => {
    partnerInfluenceAPI.fetchData("summary/partner-influence");
  }, []);

  let partnerInfluence = "Loading...";

  if (partnerInfluenceAPI.apiStatus.isLoading) {
    partnerInfluence = "Loading...";
  }

  if (partnerInfluenceAPI.apiStatus.error) {
    partnerInfluence = "Something went wrong!";
  }

  if (!partnerInfluenceAPI.apiStatus.isLoading && partnerInfluenceAPI.apiStatus.isLoaded) {
    if (partnerInfluenceAPI.data === null || partnerInfluenceAPI.data.data === undefined || partnerInfluenceAPI.data.data === null || partnerInfluenceAPI.data.data.length === 0) {
      partnerInfluence = "No data available";
    } else {
      partnerInfluence = (
        <Wrapper>
          <DonutChart chartId={"partnerInfluence"} chartData={partnerInfluenceAPI.data.data} />
        </Wrapper>
      );
    }
  }

  // CATEGORY DISTRIBUTION
  useEffect(() => {
    categoryDistributionAPI.fetchData("summary/category-distribution");
  }, []);

  let categoryDistribution = "Loading...";

  if (categoryDistributionAPI.apiStatus.isLoading) {
    categoryDistribution = "Loading...";
  }

  if (categoryDistributionAPI.apiStatus.error) {
    categoryDistribution = "Something went wrong!";
  }

  if (!categoryDistributionAPI.apiStatus.isLoading && categoryDistributionAPI.apiStatus.isLoaded) {
    if (categoryDistributionAPI.data === null || categoryDistributionAPI.data.data === undefined || categoryDistributionAPI.data.data === null || categoryDistributionAPI.data.data.length === 0) {
      categoryDistribution = "No data available";
    } else {
      categoryDistribution = (
        <Wrapper>
          <DonutChart chartId={"categoryDistribution"} chartData={categoryDistributionAPI.data.data} />
        </Wrapper>
      );
    }
  }

  // COUNTRY DISTRIBUTION
  useEffect(() => {
    countryDistributionAPI.fetchData("summary/country-distribution");
  }, []);

  let countryDistribution = "Loading...";

  if (countryDistributionAPI.apiStatus.isLoading) {
    countryDistribution = "Loading...";
  }

  if (countryDistributionAPI.apiStatus.error) {
    countryDistribution = "Something went wrong!";
  }

  if (!countryDistributionAPI.apiStatus.isLoading && countryDistributionAPI.apiStatus.isLoaded) {
    if (countryDistributionAPI.data === null || countryDistributionAPI.data.data === undefined || countryDistributionAPI.data.data === null || countryDistributionAPI.data.data.length === 0) {
      countryDistribution = "No data available";
    } else {
      countryDistribution = (
        <Wrapper>
          <DonutChart chartId={"countryDistribution"} chartData={countryDistributionAPI.data.data} />
        </Wrapper>
      );
    }
  }

  // USER WISE LEADS DISTRIBUTION
  useEffect(() => {
    usersWiseLeadDistributionAPI.fetchData("summary/users-wise-lead-distribution");
  }, []);

  let usersWiseLeadDistribution = "Loading...";

  if (usersWiseLeadDistributionAPI.apiStatus.isLoading) {
    usersWiseLeadDistribution = "Loading...";
  }

  if (usersWiseLeadDistributionAPI.apiStatus.error) {
    usersWiseLeadDistribution = "Something went wrong!";
  }

  if (!usersWiseLeadDistributionAPI.apiStatus.isLoading && usersWiseLeadDistributionAPI.apiStatus.isLoaded) {
    if (usersWiseLeadDistributionAPI.data === null || usersWiseLeadDistributionAPI.data.data === undefined || usersWiseLeadDistributionAPI.data.data === null || usersWiseLeadDistributionAPI.data.data.length === 0) {
      usersWiseLeadDistribution = "No data available";
    } else {
      usersWiseLeadDistribution = (
        <Wrapper>
          <DonutChart chartId={"usersWiseLeadDistribution"} chartData={usersWiseLeadDistributionAPI.data.data} />
        </Wrapper>
      );
    }
  }

  return (
    <Wrapper>
      <div className="grid grid-cols-8 statsSection">{metricCards}</div>
      <div className="grid grid-cols-2">
        <div className="card">
          <div className="header">Lead stage with sales</div>
          <div className="body">{leadSalesStage}</div>
        </div>
        <div className="card">
          <div className="header">User-wise leads</div>
          <div className="body">{usersWiseLeadDistribution}</div>
        </div>
        <div className="card">
          <div className="header">Leadership Influence</div>
          <div className="body">{leadershipInfluence}</div>
        </div>
        <div className="card">
          <div className="header">Partner Influence</div>
          <div className="body">{partnerInfluence}</div>
        </div>
        <div className="card">
          <div className="header">Category/Vertical</div>
          <div className="body">{categoryDistribution}</div>
        </div>
        <div className="card">
          <div className="header">Country Distribution</div>
          <div className="body">{countryDistribution}</div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Home;
