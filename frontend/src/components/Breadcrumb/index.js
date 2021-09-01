import { useLocation } from "react-router-dom";

import { Content } from './styles';

export default function ComponentBreadcrumb({ title }) {
  const location = useLocation();

  const locationName = location.pathname.replace(/[0-9]/g, "");
  const locationNameFormatted = locationName.replace(/[^\w\s]/gi, " ");

  const firstName = locationNameFormatted.split(' ')

  return (
    <Content>
      {firstName[1]} &rarr; <b>&nbsp;{title}</b>
    </Content>
  );
}
