import { useLocation } from "react-router-dom";

import { Content } from './styles';

export default function ComponentBreadcrumb({ title }) {
  const location = useLocation();

  const locationName = location.pathname.replace(/[0-9]/g, "");
  const locationNameFormatted = locationName.replace(/[^\w\s]/gi, " ");

  console.log(locationName)

  return (
    <Content>
      {locationNameFormatted} &rarr; <b>&nbsp;{title}</b>
    </Content>
  );
}
