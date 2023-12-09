import { createBrowserRouter } from 'react-router-dom'

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/signin',
    element: <SignIn />,
    exact: true,
  },
  {
    path: '/campaign/:address',
    element: <CampaignExplorer />,
    exact: true,
  },
  {
    path: '/campaign',
    element: <Campaign />,
    exact: true,
  },
])

/**https://reactrouter.com/en/main/start/tutorial
//protected
/my_campaigns
/campaigns
/campaign/
/my_donations
/profile
/create_campaign
/signin
/
//public
/signin
/campaign/:address
/campaign/
/
 */
