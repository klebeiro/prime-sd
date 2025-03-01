import { useEffect, useState } from "react";
import { FieldComponent, EmailFieldComponent, PasswordFieldComponent } from "../components/FieldComponents";
import { deleteUser, getUser } from "../services/userService";
import { MenuLayout } from "../layouts/MenuLayout";
import { update } from "../hooks/updateUser";
import ConfirmModal from "../components/ModalComponent";
import { useNavigate } from "react-router-dom";

const  ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { handleUpdate, errors, success } = update();

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
      setShowModal(false);
      await deleteUser();
      localStorage.removeItem("token");
      navigate("/");
  };

  const handleCancel = () => {
      setShowModal(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleUpdate(formData.name, formData.email, formData.password, formData.confirmPassword);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchUser();

    if(success)
      window.location.reload();
  }, [success]);

  return (
    <MenuLayout nav="Profile">
      <div className="flex-1 flex items-center flex-col">
        <h2 className="text-xl font-semibold my-16 text-black">Perfil</h2>
        <div className="bg-white rounded-xl p-6 w-96 text-center border border-black">

          <div className="text-gray-700 space-y-1">
            <p className="text-sm">Nome</p>
            <p className="font-medium text-black">{user.name}</p>

            <p className="text-sm mt-4">E-Mail</p>
            <p className="font-medium text-black">{user.email}</p>
          </div>

          <button className="mt-6 cursor-pointer w-full bg-black text-white py-2 rounded-lg hover:bg-neutral-700" onClick={() => setIsModalOpen(true)}>
            Editar Perfil
          </button>
          <button className="mt-4 cursor-pointer text-red-500 text-sm hover:underline" onClick={handleDeleteClick}>
            Excluir Conta
          </button>
        </div>
      </div>

      {showModal && (
          <ConfirmModal
              message="Tem certeza que deseja excluir?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
          />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/1 transition-opacity bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
            <button
              className="absolute top-3 right-4 text-lg font-bold text-black"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 text-black">Editar Perfil</h2>

            <form className="space-y-3">
              <FieldComponent label="Nome" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
              <EmailFieldComponent value={formData.email} onChange={handleChange} error={errors.email} />
              <PasswordFieldComponent value={formData.password} onChange={handleChange} error={errors.password} />
              <PasswordFieldComponent
                label="Confirmar Senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <button
                type="submit"
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-600"
                onClick={handleSubmit}
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </MenuLayout>
  );
};

export default ProfilePage