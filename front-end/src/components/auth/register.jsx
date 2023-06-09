import { Flex, FormControl, FormErrorMessage, Heading, Input, useColorModeValue, Button, useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../theme/themeToggler";
import AxiosInstance from "../../services/auth_service";

export const Register = () => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await AxiosInstance.post('/user/create', values)
            toast({ 
                title: "Account crated successfully",
                status: "success",
                isClosable: true,
                duration: 1500,
            });
        } catch (error) {
            toast({ 
                title: `${error.response.data.detail}`,
                status: "error",
                isClosable: true,
                duration: 1500,
            });
        }
    }

    return (
    
    <Flex height="100vh" align="center" justifyContent="center">
        <Flex 
        direction="column" 
        alignItems="center" 
        background={useColorModeValue('gray.100', 'gray.700')}
        p={12}
        rounded={6} 
        >
            <Heading mb={6}>Register</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <Input
                    placeholder="email"
                    background={useColorModeValue('gray.300', 'gray.600')}
                    type="email"
                    size="lg"
                    mt={6}
                    {...register("email", {
                        required: "This is a required field"
                    })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.username}>
                    <Input
                    placeholder="username"
                    background={useColorModeValue('gray.300', 'gray.600')}
                    type="username"
                    size="lg"
                    mt={6}
                    {...register("username", {
                        required: "This is a required field",
                        minLength: {value: 5, message: "Username must be at least 5 characters"},
                        maxLength: {value: 24, message: "Username must be at most 24 characters"}
                    })}
                    />
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                    <Input
                    placeholder="password"
                    background={useColorModeValue('gray.300', 'gray.600')}
                    type="password"
                    size="lg"
                    mt={6}
                    {...register("password", {
                        required: "This is a required field",
                        minLength: {value: 5, message: "Password must be at least 5 characters"},
                        maxLength: {value: 24, message: "Username must be at most 24 characters"}
                    })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                
                <Button 
                isLoading={isSubmitting}
                loadingText="Logging in..."
                width="100%"
                colorScheme="green"
                variant="outline"
                mt={6}
                mb={6}
                type="submit">Register</Button>
            </form>
            <ThemeToggler  showLabel={true}/>

            <Button onClick={()=>navigate("/login", {replace: true})} 
            width="100%"
            colorScheme="gray"
            variant="outline"
            mt={6}>Login Instead</Button>
        </Flex>
    </Flex>
);}