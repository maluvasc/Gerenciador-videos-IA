import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import styles from "./configuracoes.module.css";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiDelete } from "react-icons/fi";
import api from "../../../api";

function Configuracoes() {
  const [nome, setNome] = useState("");
  const [consent, setConsent] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    localStorage.setItem("user", nome);

    try {
      await api.put("app/user/update/", { email }); // Apenas email
      alert("Email atualizado com sucesso!");
    } catch (error) {
      console.log(error.response); // Ver erro no console
      setErrors(error.response?.data || { general: "Erro inesperado." });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await api.put("app/user/changePassword/", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      alert("Senha alterada com sucesso!");
    } catch (error) {
      setErrors(error.response?.data || { general: "Erro inesperado." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("app/user/delete/");
      alert("Conta excluída com sucesso!");
      navigate("/login");
    } catch (error) {
      setErrors({ general: "Erro ao excluir conta." });
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.mainProfile}>
        <div className={styles.titleFlex}>
          <h1 className={styles.titleFont}>Editar Perfil</h1>
          <FiUser style={{ width: "30px", height: "30px" }} />
        </div>
        <div className={styles.line}></div>
        <form onSubmit={handleProfileUpdate}>
          <div className={styles.flexFirstRow}>
            <div className={styles.flexFirstRowFirstColumn}>
              <label>Escolha a imagem do perfil</label>
              <label htmlFor="fileUpload" className={styles.uploadLabel}>
                <div className={styles.uploadBox}>
                  <span className={styles.uploadText}>+</span>
                </div>
              </label>
              <input
                type="file"
                id="fileUpload"
                className={styles.uploadInput}
              />
            </div>
            <div className={styles.flexFirstRowSecondColumn}>
              <div className={styles.nameInput}>
                <label htmlFor="text">Nome</label>
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className={styles.nameInput}>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={errors.email ? styles.errorInput : ""}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>
            <div className={styles.buttonDiv}>
              <button class={styles.passwordButton}> Salvar alterações</button>
            </div>
          </div>
        </form>
        <div className={styles.line}></div>

        <div className={styles.secondLine}>
          <div className={styles.passwordContainer}>
            <div className={styles.titleFlex}>
              <h1 className={styles.titleFont}>Alterar Senha</h1>
              <FiLock style={{ width: "30px", height: "30px" }} />
            </div>
            <div className={styles.flexFirstRowSecondColumn}>
              <form onSubmit={handlePasswordChange}>
                <div className={styles.userInput}>
                  <label>Senha Atual</label>
                  <input
                    type="password"
                    className={styles.inputInformationName}
                    placeholder="Senha Atual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className={styles.userInput}>
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    className={styles.inputInformationUser}
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className={styles.userInput}>
                  <label>Confimar Senha</label>
                  <input
                    type="password"
                    className={styles.inputInformationUser}
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" disabled={loading}>
                  Alterar Senha
                </button>
              </form>
            </div>
          </div>

          <div className={styles.deleteContainer}>
            <div className={styles.titleFlex}>
              <h1 className={styles.titleFont}>Deletar conta</h1>
              <FiDelete style={{ width: "30px", height: "30px" }} />
            </div>

            <div className={styles.noticeBox}>
              <p className={styles.noticeText}>
                Entendo perfeitamente que esta ação é irreversível e, caso eu
                deseje recuperar o acesso à plataforma no futuro, serei obrigado
                a enviar uma solicitação formal ao meu administrador de serviço
                para a criação de uma nova conta.
              </p>
            </div>
            <div class={styles.checkboxContainer}>
              <input type="checkbox" id="consent" />
              <label for="consent">Eu concordo com o aviso acima</label>
            </div>
            <button
              onClick={handleDeleteAccount}
              className={styles.deleteButton}
            >
              Excluir Conta
            </button>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}

export default Configuracoes;
