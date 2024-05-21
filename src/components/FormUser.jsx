import { useEffect } from "react"
import { useForm } from "react-hook-form"
import './styles/FormUser.css'

const FormUser = ({ createUser, userSelected, updateUser, setUserSelected, formIsOpen, setFormIsOpen }) => {

    const { handleSubmit, register, reset, formState: {errors}} = useForm()

    useEffect(() => {
      reset(userSelected)
    }, [userSelected])    

    const submit = data => {
        if(userSelected){
            updateUser(userSelected.id, data)
            setUserSelected()
        } else {
            createUser(data)
        }
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: ''
        });
        setFormIsOpen(false)
    };   

    const handlExit = () => {
        setFormIsOpen(false);
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: ''
        });
        setUserSelected()
    };




  return (
    <div className={`form-container ${formIsOpen || 'form-close'}`}>
        <form className="form" onSubmit={handleSubmit(submit)}>
            <span onClick={handlExit} className="form-exit"><i className='bx bx-x-circle bx-spin' ></i></span>
            <h2 className="form-title">{userSelected ? 'Register User Form' : 'Create User Form'}</h2>
            <div className="form-list">
            <label className="form-field">
                <span className="form-label">Email</span>
                <input className="form-input" {...register('email', {
                    minLength: {
                        value: 9,
                        message: '❌Debe tener un minimo de 9 caracteres'
                    }  })} type="email"/>  
                <h4>{errors.email?.message}</h4>
            </label>
            <label className="form-field">
                <span className="form-label">Passwors</span>
                <input className="form-input" {...register('password', {
                    minLength: {
                        value: 8,
                        message:'❌Debe tener un minimo de 8 caracteres'
                    },
                    pattern: {
                        value: '/\+@-',
                        message: 'Debe tener un caracter especial'
                    }
                })} type="password"/>
                <h4>{errors.password?.message}</h4>                
            </label>
            <label className="form-field">
                <span className="form-label">Fisrt Name</span>
                <input className="form-input" {...register('first_name')} type="text"/>
            </label>
            <label className="form-field">
                <span className="form-label">Last Name</span>
                <input className="form-input" {...register('last_name')} type="text"/>
            </label>
            <label className="form-field">
                <span className="form-label">Birthday</span>
                <input className="form-input" {...register('birthday')} type="date"/>
            </label>
            </div>
            <button className="form-btn">Submit</button>                            
        </form>
    </div>
  )
}

export default FormUser
