import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import ApiTest from "@/pages/api-test";
import Explorer from "@/pages/explorer";
import Claim from "@/pages/claim";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/claim" component={Claim} />
      <Route path="/profile" component={Profile} />
      <Route path="/api-test" component={ApiTest} />
      <Route path="/explorer" component={Explorer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
