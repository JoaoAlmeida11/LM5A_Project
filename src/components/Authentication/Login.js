
import {Form, Button} from 'react-bootstrap';


export default function Login(){
    return(
    <div>
       <Form>
                <h3>Sign In</h3>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value="email"  placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value="password"  placeholder="Enter password" />
                </Form.Group>

                <Form.Group>
                    <Form.Control custom={true} className="custom-control custom-checkbox">
                        <Form.Check type="checkbox" id="customCheck1" />
                        <Form.Label className="custom-control-Form.Label" htmlFor="customCheck1">Remember me</Form.Label>
                    </Form.Control>
                </Form.Group>

                <Button value="submit" variant="primary">Submit</Button>
                <Form.Text className="forgot-password text-right">Forgot</Form.Text>
        </Form>
    </div>
    )
}