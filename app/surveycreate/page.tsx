import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
import SurveyForm from "@/components/SurveyForm";

const surveycreate = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Survey</h3>

      <SurveyForm type="create" session={session} />
    </Modal>
  );
};
export default surveycreate;