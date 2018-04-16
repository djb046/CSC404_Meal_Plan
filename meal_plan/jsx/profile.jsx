import React from 'react'
import ReactDom from 'react-dom'
import { Container, Card, Icon, Image, Grid, Segment, Button } from 'semantic-ui-react'


const Profile = () => (
    <Grid columns='equal' style={{ margin: '1%' }}>
        <Grid.Row columns={2} relaxed='true' verticalAlign='middle'>
            <Grid.Column width={8}>            
                <Image src="./tyronebiggums.jpg" bordered size='large'/>                
            </Grid.Column>
            <Grid.Column width={8}>
            <Button inverted color='blue' className='dashButton1' >Edit Profile</Button>
            <Button inverted color='blue' className='dashButton1' >Edit Hub</Button>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'center'>
        <Button inverted color='blue' className='dashButton2' >View Meal Plan</Button>
        <Button inverted color='blue' className='dashButton2' >Edit Meal Plan</Button>
        <Button inverted color='blue' className='dashButton2' href='/createMealPlan' >Generate Meal Plan</Button>
        
        </Grid.Row>
        
    </Grid>


)

export default Profile