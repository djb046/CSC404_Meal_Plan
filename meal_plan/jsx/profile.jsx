import React from 'react'
import ReactDom from 'react-dom'
import { Container, Card, Icon, Image, Grid, Segment, Button } from 'semantic-ui-react'


const Profile = () => (
    <Grid columns='equal'>
        <Grid.Row verticalAlign='middle'>
        {/* Avatar Image must be 150x150px! */}  
            <Image href="/profile"centered circular src="images/joe.jpg"/>               
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'middle'>
            <Button fluid centered color='orange' className='dashButton2' href='/profile' >Edit Profile</Button>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'middle'>
            <Button fluid centered color='orange' className='dashButton2' href= '/viewMealPlan'>View Meal Plan</Button>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'middle'>
            <Button fluid centered color='orange' className='dashButton2' href='/createMealPlan' >Generate Meal Plan</Button>
        </Grid.Row>
        <Button fluid centered color='orange' className='dashButton2' href='/auth/fitbit' > Sync Fitbit</Button>
        <Grid.Row>

            </Grid.Row>
        
    </Grid>


)

export default Profile