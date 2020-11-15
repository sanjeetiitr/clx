
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CanvasPlaygroundContainer } from "./Container/CanvasPlayground";
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
          component={(props) => < CanvasPlaygroundContainer {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

