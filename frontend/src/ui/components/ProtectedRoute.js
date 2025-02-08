import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from '../../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../constants'
import { useState, useEffect } from 'react'

// Componente que protege as rotas da aplicação, verificando se o usuário está autenticado
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null) // Estado que armazena se o usuário está autenticado

    // Hook do React que executa a função passada como primeiro argumento quando o componente é montado
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // Função que realiza a requisição para atualizar o token de acesso
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) // Obtém o token de atualização do armazenamento local do navegador
        try { 
            // Realiza a requisição para atualizar o token de acesso
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            })
            // Caso a requisição seja bem sucedida, armazena o novo token de acesso no armazenamento local do navegador e define que o usuário está autenticado
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                // Caso a requisição não seja bem sucedida, define que o usuário não está autenticado
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // Função que verifica se o usuário está autenticado
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN) // Obtém o token de acesso do armazenamento local do navegador
        // Caso o token de acesso não exista, define que o usuário não está autenticado
        if (!token) {
            setIsAuthorized(false)
            return
        }

        // Decodifica o token de acesso para obter a data de expiração
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        // Caso o token de acesso tenha expirado, realiza a requisição para atualizar o token de acesso
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true) // Caso o token de acesso ainda seja válido, define que o usuário está autenticado
        }
    }

    // Caso o estado de autenticação seja nulo, exibe uma mensagem de carregamento
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // Caso o usuário esteja autenticado, exibe o conteúdo da rota protegida, caso contrário, redireciona para a página de login
    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute