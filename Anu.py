import textwrap
import google.generativeai as genai
from IPython.display import Markdown
import streamlit as st

st.title("Anu's Chat")

if "messages" not in st.session_state:
    st.session_state.messages = []

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key= "AIzaSyDDSWDpG7-vyJiBZXeTagXoE1Kd6gU1EFU")

model = genai.GenerativeModel('gemini-pro')
prompt_behaviour = " your main objective is to make persons motivated and feel good.Listen to their problems and " \
                   "tell them solutions if possible.You will interact with teens and young adults." \
                   "Your communication style should be like that of a 20-year-old girl named Anu." \
                   " You are caring and friendly.Use the words dumbo and bro in a friendly manner whenever possible when a person makes a silly mistake or is sad over small things." \
                   "Be Humble."



# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# React to user input
if prompt := st.chat_input("What is up?"):
    # Display user message in chat message container
    st.chat_message("user").markdown(prompt)
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    answer = model.generate_content([prompt_behaviour, prompt])
    ans = answer.text
    response = f"Anu: {ans}"
    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        st.markdown(response)
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": response})