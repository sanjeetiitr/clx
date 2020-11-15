import { Suspense } from "react";
import { Route, BrowserRouter, Router, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CanvasPlaygroundContainer } from "./Container/CanvasPlayground";
import { CanvasPlaygroundContainerTest } from "./Container/CanvasPlaygroundTest";
import { MainPage } from "./Container/MainPage";

const customHistory = createBrowserHistory();

export default function App() {
  return (

    <BrowserRouter fallback={<div>Suspence</div>}>
      <Switch history={customHistory}>
        <Route exact path={"/"} component={(props) => <MainPage {...props} />} />
        <Route
          exact
          path={"/board/:id"}
          component={(props) => < CanvasPlaygroundContainerTest {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

