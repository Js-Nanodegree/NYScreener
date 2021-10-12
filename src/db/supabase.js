import { createClient } from "@supabase/supabase-js";
const URL = "https://tplggbxxtvgtfgfcygfq.supabase.co";
const anon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDAyNzEzMSwiZXhwIjoxOTQ5NjAzMTMxfQ.b6iv5utRKCNzqMpF1-cjfiNy8f7tQs4ZSjuJnmvfne0";
const supaBase = createClient(URL, anon);

const SupaBase = {
  async createMessage(message) {
    const { data, error } = await supaBase.from("chat").insert([message]);
    return data[0];
  },
  async currentMessage(from, to) {
    const { data, error } = await supaBase
      .from("chat")
      .select()
      .in("from", [from, to])
      .in("to", [from, to]);

    return data;
  },
  async getMessage(from) {
    const { data, error } = await supaBase
      .from("chat")
      .select()
      .eq("from", from);

    return data;
  },
  async updateMessage(id, message) {
    const data = await supaBase.from("chat").update({ message }).eq("id", id);
    return data;
  },
};

export default SupaBase;
