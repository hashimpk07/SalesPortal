# Mallcomm Sales Portal

## Setup
Run:
1. `git checkout ...`
2. `npm i`
3. `npm run dev`

### Requirements
We're 

#### Node 
Use Node v20.16.0
We recommend using nvm: `nvm install 20.16.0`

### Mallcomm js utils
Our util library. 

#### Access
1.  You'll need an npm account.  If you don't have one, create one.
2.  Ask a member of the team to add you as a collaborator for the @mallcomm npm org.
3.  Create read-only access token for component library & utils packages via the npm UI (make a note of the token value - you'll only get to see it once).
4.  Add token to your path (`NPM_TOKEN`):

> zsh
```
echo "export NPM_TOKEN=<enter token here>" >> ~/.zshenv
```

> bash
```
export NPM_TOKEN=<enter token here>
```

5. Restart your IDE (token is unlikely to be available as soon as you've added it)
6. Profit (you can now run `npm i` without errors)


### Dev Notes:
2/3/4 calls 

1. Centres endpoint
2. Campaign list endpoint (for filter)
3. * possible * : Filter options endpoint
4. Campaign data endpoint
5. Revision endpoint (previous revisions/versions of a submission)


#### Campaign endpoint (includes):

##### SHOW:

centre,
centreCount,
centreExists,
category,
categoryCount,
categoryExists,
periodForms,
periodFormsCount,
periodFormsExists,
periodForms.locals,
periodForms.group,
groups,
groupsCount,
groupsExists


#####  RESULTS:
createdByUser,
periodForm,
periodFormCount,
periodFormExists,
formRevision,
formRevisionCount,
formRevisionExists,
local,
localCount,
localExists,
attachedMedia,
attachedMediaCount,
attachedMediaExists



## Flow:
### Campaigns page:
#### useCampaignsService
##### campaignsIndexService
Returns an array of centres (for campaigns list page)

Called if no campaign selected.

includes:
- 'centre'
- 'category'
- 'periodForms'
- 'periodFormsCount'
- 'periodFormsExists'

Filters by centreId if a centre has been selected.

sets locals (stores) list & dictionary

sets allCampaignDataForCentre & allCampaigns values

##### getCampaignResultsService
Called if campaign selected
Note: to be called on filter change

includes:
- 'createdByUser',
- 'local',
- 'periodForm',
- 'formRevision',

if exist, adds filters to request url:
- localId,
- currentlySelectedPeriodForm
- accessLevel
- collectionDates[0]
- collectionDates[1]

sets locals (stores) list & dictionary // duplication ???

sets period forms list & dictionary

sets campaign data (campaignDataForCentre) 

##### showCampaignService
Called if campaign selected
NOTE: Can't be filtered, so only call once.

includes:
- 'periodForms',
- 'centre',
- 'category',
- 'groups',
- 'periodForms.locals'

sets groups (access levels)

sets periodForms (list)




### table views
#### grouped
locals > period forms > campaign data

#### list
period forms > 
