function App() {
  return (
    <>
      <AboutPageModal ref={modalRef} handleOnCloseModal={handleOnCloseModal} />
      <Header />
      <MainContainer>
        <Outlet />
        <AIChatBot />
      </MainContainer>
      <Footer />
    </>
  );
}
