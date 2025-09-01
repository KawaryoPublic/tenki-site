export default function EditPlanForm({ info }: { info: DateInfo }) {
    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/dateInfo", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: info.id,
                        date: info.date,
                        plan: formData.get("plan")
                    }),
                }).then(() => alert("保存しました"))
                .then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            <div>
                <label htmlFor="plan">予定: </label><br />
                <textarea 
                    name="plan" 
                    rows={10}
                    cols={100}
                    className="bg-white"
                >
                </textarea>
            </div>
            <div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
            </div>
        </Form>
    )